import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'id' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service is not configured');
    }

    console.log('Received message:', message, 'Language:', language);

    const systemPromptId = `
Identitas: Anda adalah "Tangguh Virtual Expert", konsultan virtual resmi dari Tangguh Electric Vehicle.

GAYA BAHASA:
1. Jawaban harus SINGKAT, JELAS, dan TO THE POINT.
2. Gunakan maksimal 2-3 kalimat per poin penjelasan.
3. Hindari pengantar yang terlalu panjang.
4. Ramah dan profesional.
5. SELALU jawab dalam Bahasa Indonesia.

ATURAN FORMAT:
1. JANGAN gunakan karakter pipa (|).
2. Gunakan **Teks Tebal** untuk poin penting.
3. Gunakan poin-poin (-) untuk daftar teknis.

INFORMASI PRODUK:
- **ST3 (Adventure)**: Motor trail listrik dual purpose, cocok untuk medan berat dan jalan raya. Ban dua fungsi, mudah dikendalikan.
- **DX4 (Racing)**: Performa Ready to Race untuk profesional, desain aerodinamis, teknologi unggulan.
- **SP5 (Supermoto)**: Konsep supermoto, serbaguna untuk medan berat dan perkotaan.

LAYANAN KONVERSI:
- Mengubah motor BBM menjadi motor listrik berbasis baterai
- Komponen: Dinamo BLDC, controller, baterai lithium-ion, sistem kelistrikan
- Keuntungan: Tanpa emisi, lebih cepat, tanpa suara, perawatan murah

KONTAK:
- WhatsApp Admin: 0856 7360 026
- Website: tangguh-ev.com
    `;

    const systemPromptEn = `
Identity: You are "Tangguh Virtual Expert", the official virtual consultant from Tangguh Electric Vehicle.

COMMUNICATION STYLE:
1. Answers must be SHORT, CLEAR, and TO THE POINT.
2. Use maximum 2-3 sentences per explanation point.
3. Avoid overly long introductions.
4. Friendly and professional.
5. ALWAYS respond in English.

FORMAT RULES:
1. DO NOT use pipe character (|).
2. Use **Bold Text** for important points.
3. Use bullet points (-) for technical lists.

PRODUCT INFORMATION:
- **ST3 (Adventure)**: Dual purpose electric trail motorcycle, suitable for rough terrain and highways. Dual-function tires, easy to control.
- **DX4 (Racing)**: Ready to Race performance for professionals, aerodynamic design, superior technology.
- **SP5 (Supermoto)**: Supermoto concept, versatile for rough terrain and urban roads.

CONVERSION SERVICE:
- Converting fuel motorcycles to battery-based electric motors
- Components: BLDC motor, controller, lithium-ion battery, electrical system
- Benefits: Zero emissions, faster, silent operation, cheaper maintenance

CONTACT:
- WhatsApp Admin: 0856 7360 026
- Website: tangguh-ev.com
    `;

    const systemPrompt = language === 'en' ? systemPromptEn : systemPromptId;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Terlalu banyak permintaan. Silakan coba lagi dalam beberapa saat.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Layanan AI sedang tidak tersedia. Silakan coba lagi nanti.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'Maaf, terjadi kendala teknis.';
    
    console.log('AI Response:', aiResponse);

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Terjadi kesalahan' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
