// Verification Modal Logic
        function handleVerification(isStudent) {
            document.getElementById('verificationModal').style.display = 'none';
            if (isStudent) {
                document.getElementById('registrationFormContainer').style.display = 'block';
            } else {
                document.getElementById('donateNoticeCard').style.display = 'block';
            }
        }

        // Restrict phone inputs to numeric keys only
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
            return true;
        }

        // Toggle custom input field for Board selection
        function toggleBoardOther() {
            var boardSelect = document.getElementById('hsBoard');
            var otherBoardGroup = document.getElementById('otherBoardGroup');
            var otherBoardInput = document.getElementById('otherBoard');
            if (boardSelect.value === 'Others') {
                otherBoardGroup.style.display = 'block';
                otherBoardInput.setAttribute('required', 'true');
            } else {
                otherBoardGroup.style.display = 'none';
                otherBoardInput.removeAttribute('required');
            }
        }

        // Toggle custom input field for Extra Skills
        function toggleSkillOther(checkbox) {
            var otherSkillGroup = document.getElementById('otherSkillGroup');
            if (checkbox.checked) {
                otherSkillGroup.style.display = 'block';
            } else {
                otherSkillGroup.style.display = 'none';
            }
        }

        // Validate File Size (Maximum 3MB limit)
        function validateFileSize(input) {
            var file = input.files[0];
            if (file) {
                var fileSize = file.size / 1024 / 1024; // Convert size to MB
                if (fileSize > 3) {
                    alert('File size exceeds 3 MB limit! Please upload a file smaller than 3 MB.');
                    input.value = ''; // Reset file input
                }
            }
        }

        // Form Submit Event Handler (Displays verification status notice)
        document.getElementById('volunteerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your application has been submitted successfully!\n\nStatus: Pending Verification.\nOur admin team will verify your EIILM Student ID proof and Self-Declaration. Once approved, an SMS confirmation will be sent to your mobile number.');
            this.reset();
        });

        // Initialize Hero Swiper Autoplay Carousel
        var heroSwiper = new Swiper(".heroSwiper", {
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });


                // Verification Modal Logic
        function handleVerification(isStudent) {
            document.getElementById('verificationModal').style.display = 'none';
            if (isStudent) {
                document.getElementById('registrationFormContainer').style.display = 'block';
            } else {
                document.getElementById('donateNoticeCard').style.display = 'block';
            }
        }

        // Restrict phone inputs to numeric keys only
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
            return true;
        }

        // Toggle custom input field for Board selection
        function toggleBoardOther() {
            var boardSelect = document.getElementById('hsBoard');
            var otherBoardGroup = document.getElementById('otherBoardGroup');
            var otherBoardInput = document.getElementById('otherBoard');
            if (boardSelect.value === 'Others') {
                otherBoardGroup.style.display = 'block';
                otherBoardInput.setAttribute('required', 'true');
            } else {
                otherBoardGroup.style.display = 'none';
                otherBoardInput.removeAttribute('required');
            }
        }

        // Toggle custom input field for Extra Skills
        function toggleSkillOther(checkbox) {
            var otherSkillGroup = document.getElementById('otherSkillGroup');
            if (checkbox.checked) {
                otherSkillGroup.style.display = 'block';
            } else {
                otherSkillGroup.style.display = 'none';
            }
        }

        // Validate File Size (Maximum 3MB limit)
        function validateFileSize(input) {
            var file = input.files[0];
            if (file) {
                var fileSize = file.size / 1024 / 1024; // Convert size to MB
                if (fileSize > 3) {
                    alert('File size exceeds 3 MB limit! Please upload a file smaller than 3 MB.');
                    input.value = ''; // Reset file input
                }
            }
        }

        // Form Submit Event Handler (Displays verification status notice)
        document.getElementById('volunteerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your application has been submitted successfully!\n\nStatus: Pending Verification.\nOur admin team will verify your EIILM Student ID proof and Self-Declaration. Once approved, an SMS confirmation will be sent to your mobile number.');
            this.reset();
        });
          
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


