function scrollGrid(direction) {
      const wrapper = document.getElementById('gridWrapper');
      const scrollAmount = 300;
      if (direction === 'left') {
        wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }

    function filterTeam(category) {
      // Update active button state
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      // Filter cards
      const cards = document.querySelectorAll('.team-card');
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
      
      // ===================================================
      // 24/7 AI CHATBOT LOGIC ENGINE
      // ===================================================
      function toggleTlfChat() {
        const win = document.getElementById('tlfChatWindow');
        const icon = document.getElementById('tlfChatIcon');
        if (win.style.display === 'flex') {
          win.style.display = 'none';
          icon.className = 'icon-chat';
        } else {
          win.style.display = 'flex';
          icon.className = 'icon-close';
          document.getElementById('tlfChatInput').focus();
        }
      }

      function sendSuggestedQuery(text) {
        document.getElementById('tlfChatInput').value = text;
        handleChatSubmit(new Event('submit'));
      }

      function handleChatSubmit(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('tlfChatInput');
        const query = input.value.trim();
        if (!query) return false;

        appendChatMessage(query, 'user');
        input.value = '';

        const indicator = document.getElementById('tlfTypingIndicator');
        indicator.style.display = 'block';
        scrollChatToBottom();

        // 24/7 AI Response Engine
        setTimeout(() => {
          indicator.style.display = 'none';
          const reply = generateAiResponse(query);
          appendChatMessage(reply, 'bot');
          scrollChatToBottom();
        }, 600);

        return false;
      }

      function appendChatMessage(text, sender) {
        const body = document.getElementById('tlfChatBody');
        const msgDiv = document.createElement('div');
        msgDiv.className = `tlf-chat-msg ${sender}`;
        msgDiv.innerHTML = text;
        body.insertBefore(msgDiv, document.getElementById('tlfTypingIndicator'));
      }

      function scrollChatToBottom() {
        const body = document.getElementById('tlfChatBody');
        body.scrollTop = body.scrollHeight;
      }

      function generateAiResponse(input) {
        const text = input.toLowerCase();
        
        if (text.includes('donate') || text.includes('donation') || text.includes('payment') || text.includes('upi')) {
          return 'You can donate directly to Towards Life Foundation using our <a href="donate.html" style="color:#027bb9; font-weight:bold;">Donate Section</a> via UPI, Credit/Debit Cards, or Bank Transfer. Every rupee supports education and nutritional drives for street children!';
        }
        else if (text.includes('volunteer') || text.includes('join') || text.includes('teacher')) {
          return 'TLF accepts volunteer teachers exclusively from <strong>EIILM Kolkata</strong> (BCA, BBA, MCA, MBA). You can sign up through our <a href="volunteer.html" style="color:#027bb9; font-weight:bold;">Volunteer Section</a>!';
        }
        else if (text.includes('shop') || text.includes('product') || text.includes('tote') || text.includes('candle') || text.includes('buy')) {
          return 'Our children craft wonderful handmade items including painted Tote Bags (₹450) and Organic Scented Candles (₹120). Check out <a href="shop.html" style="color:#027bb9; font-weight:bold;">Our Shop</a> or visit the full marketplace!';
        }
        else if (text.includes('centre') || text.includes('center') || text.includes('location') || text.includes('where')) {
          return 'TLF runs 8 active learning centres across Kolkata, including Tollygunge, Chetla, Bidhannagar, Shyambazar, and Dum Dum, serving over 1,000 pavement children.';
        }
        else if (text.includes('about') || text.includes('who') || text.includes('mission') || text.includes('tlf')) {
          return 'Towards Life Foundation (TLF) is a CSR initiative originated at EIILM Kolkata dedicated to providing education, health, and economic self-reliance to pavement dwellers.';
        }
        else if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('address')) {
          return 'Reach us at <strong>info@towardslifefoundation.org</strong> or call <strong>+91 33 2289 7780</strong> at the EIILM Kolkata campus.';
        }
        else {
          return "I'm sorry, I don't have information about that. Please contact our office directly:\n\nOffice Address: EIILM Kolkata Campus, Kolkata, West Bengal, India\nPhone: +91 33 2289 7780\nEmail: info@towardslifefoundation.org";
        }
      }
