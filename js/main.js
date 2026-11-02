document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#heroDots .dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  
  let currentSlide = 0;
  const slideIntervalTime = 5000; // Auto-slide delay (5 seconds)
  let slideTimer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoPlay() {
    slideTimer = setInterval(nextSlide, slideIntervalTime);
  }

  function resetAutoPlay() {
    clearInterval(slideTimer);
    startAutoPlay();
  }

  // Event Listeners for Arrows
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Event Listeners for Indicator Dots
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      resetAutoPlay();
    });
  });

  // Start auto-play on load
  startAutoPlay();
}); 
 
 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });
 // end hero section
(function($) {

	"use strict";

	$(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		if (!$.fn.owlCarousel) {
			return;
		}

		$('.fundraiser-hero-carousel, .owl-1').each(function() {
			var $heroCarousel = $(this);
			if ($heroCarousel.hasClass('owl-loaded')) {
				return;
			}

			$heroCarousel.owlCarousel({
				items: 1,
				loop: true,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 1500,
				smartSpeed: 1500,
				autoplayHoverPause: false,
				nav: false,
				dots: $heroCarousel.hasClass('owl-1'),
				margin: 0
			});
		});

		var $causeCarousel = $('.carousel-cause');
		if ($causeCarousel.length && !$causeCarousel.hasClass('owl-loaded')) {
			$causeCarousel.owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding:0,
			nav: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1,
					stagePadding: 0
				},
				600:{
					items: 2,
					stagePadding: 50
				},
				1000:{
					items: 3,
					stagePadding: 100
				}
			}
			});
		}

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('#appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('#appointment_time').timepicker();




})(jQuery);
      // 1. Modal Trigger
      function openAdminPortal() {
        $('#adminLoginModal').modal('show');
      }

      // 2. Sign In / New User switcher
      function switchAuthTab(tab) {
        const signInPanel = document.getElementById('signInPanel');
        const signUpPanel = document.getElementById('signUpPanel');
        const signInTab = document.getElementById('signInTab');
        const newUserTab = document.getElementById('newUserTab');

        const isSignIn = tab === 'signin';
        signInPanel.style.display = isSignIn ? 'block' : 'none';
        signUpPanel.style.display = isSignIn ? 'none' : 'block';
        signInTab.classList.toggle('active', isSignIn);
        newUserTab.classList.toggle('active', !isSignIn);
      }

      // 3. New user registration (front-end demo)
      function handleNewUserRegistration(event) {
        event.preventDefault();
        const name = document.getElementById('newUserName').value.trim();
        const email = document.getElementById('newUserEmail').value.trim();
        const userId = document.getElementById('newUserId').value.trim();

        if (!name || !email || !userId) {
          alert('Please complete all registration details.');
          return false;
        }

        TLFData.add('users', {name, email, userId, role:'New User'});
        alert(`Welcome, ${name}! Your new user account has been created successfully and saved.`);
        document.querySelector('#signUpPanel form').reset();
        switchAuthTab('signin');
        return false;
      }

      // 4. User Sign-in Handler
      function handleUserLogin(event) {
        event.preventDefault();
        $('#userLoginModal').modal('hide');
        const loginField = document.querySelector('#userLoginModal input');
        const identity = loginField ? loginField.value.trim() : 'User';
        TLFData.add('loginAudit', {identity, role:'User', action:'Sign In'});
        alert('Volunteer / Student Sign-in Verified.');
        return false;
      }

      // 3. Admin Authentication with Emp ID
      function handleAdminLogin(event) {
        event.preventDefault();
        const empId = document.getElementById('adminEmpId').value.trim();
        const email = document.getElementById('adminEmail').value.trim();
        const pass = document.getElementById('adminPass').value.trim();

        if (empId === "" || email === "" || pass === "") {
          alert('Please provide all admin credentials.');
          return false;
        }

        TLFData.add('loginAudit', {identity: empId, role:'Admin', action:'Admin Sign In'});
        $('#adminLoginModal').modal('hide');
        const adminSection = document.getElementById('admin-section');
        adminSection.style.display = 'block';

        document.getElementById('adminSessionEmpBadge').innerText = `AUTHENTICATED: ${empId.toUpperCase()}`;
        adminSection.scrollIntoView({ behavior: 'smooth' });

        alert(`Welcome, Admin (${empId})! Administrative controls are now unlocked.`);
        return false;
      }

      // 4. Admin Session Exit
      function exitAdminSession() {
        if (confirm('Do you want to log out of the Admin Panel?')) {
          document.getElementById('admin-section').style.display = 'none';
          alert('Admin session ended securely.');
          window.location.href = '#home-section';
        }
      }

      // 5. Dynamic Client-Side Product Insertion
      function adminAddNewProduct() {
        const title = prompt("Enter New Product Title:", "Handmade Bamboo Lamp");
        if (!title) return;
        const category = prompt("Enter Category:", "Crafts");
        const price = prompt("Enter Price (INR):", "350");

        if (title && price) {
          $('#adminProductTable tbody').append(`
            <tr>
              <td>${title}</td>
              <td>${category || 'General'}</td>
              <td>₹${price}</td>
              <td>50</td>
              <td><button class="btn btn-sm btn-outline-danger" onclick="$(this).closest('tr').remove()">Remove</button></td>
            </tr>
          `);

          $('#publicProductGrid').append(`
            <div class="col-md-4 text-center mb-4">
              <div class="card p-3 shadow-sm border-0 h-100">
                <img src="images/IMG-20260108-WA0042.jpg.jpeg" class="card-img-top img-fluid mb-3 rounded" alt="${title}" style="height: 200px; object-fit: cover;">
                <h4>${title}</h4>
                <p class="text-muted small">${category || 'Handcrafted'}</p>
                <h5 class="text-success font-weight-bold">₹${price}</h5>
                <button class="btn btn-warning btn-block mt-auto font-weight-bold">Buy Now</button>
              </div>
            </div>
          `);

          TLFData.add('products', {title, category: category || 'General', price: parseFloat(price), stock:50});
          alert('Product added successfully to both the Admin Catalog and Public Shop! Data has been saved for Excel export.');
        }
      }

      // 6. Social Media Post Manager
      let socialPosts = JSON.parse(localStorage.getItem('tlfSocialPosts') || '[]');

      function toggleSocialSchedule() {
        const scheduled = document.getElementById('socialScheduleMode').value === 'scheduled';
        document.getElementById('socialScheduleFields').style.display = scheduled ? 'flex' : 'none';
        document.getElementById('socialSubmitBtn').innerHTML = scheduled
          ? '<span class="icon-calendar mr-1"></span> Schedule Post'
          : '<span class="icon-paper-plane mr-1"></span> Post Now';
        document.getElementById('socialPostDate').required = scheduled;
        document.getElementById('socialPostTime').required = scheduled;
      }

      function updateSocialPreview() {
        const title = document.getElementById('socialPostTitle').value.trim();
        const content = document.getElementById('socialPostContent').value.trim();
        const tags = document.getElementById('socialPostHashtags').value.trim();
        document.getElementById('previewSocialTitle').textContent = title || 'Your post title will appear here';
        document.getElementById('previewSocialContent').textContent = content || 'Your post content will appear here.';
        document.getElementById('previewSocialTags').textContent = tags;
      }

      function saveSocialPost(event) {
        event.preventDefault();
        const mode = document.getElementById('socialScheduleMode').value;
        const title = document.getElementById('socialPostTitle').value.trim();
        const content = document.getElementById('socialPostContent').value.trim();
        const platform = document.getElementById('socialPlatform').value;
        const type = document.getElementById('socialPostType').value;
        const hashtags = document.getElementById('socialPostHashtags').value.trim();
        let publishAt = new Date();

        if (mode === 'scheduled') {
          const date = document.getElementById('socialPostDate').value;
          const time = document.getElementById('socialPostTime').value;
          publishAt = new Date(date + 'T' + time);
          if (!date || !time || Number.isNaN(publishAt.getTime()) || publishAt <= new Date()) {
            alert('Please choose a valid future date and time.');
            return false;
          }
        }

        const post = {
          id: Date.now(), type, platform, title, content, hashtags,
          publishAt: publishAt.toISOString(), status: mode === 'scheduled' ? 'Scheduled' : 'Published'
        };
        socialPosts.unshift(post);
        localStorage.setItem('tlfSocialPosts', JSON.stringify(socialPosts));
        renderSocialPosts();
        alert(mode === 'scheduled'
          ? `Post scheduled successfully for ${publishAt.toLocaleString()}.`
          : `${type} post published in demo mode to ${platform}.`);
        resetSocialPostForm();
        return false;
      }

      function renderSocialPosts() {
        const tbody = document.querySelector('#socialPostsTable tbody');
        const empty = document.getElementById('socialEmptyState');
        tbody.innerHTML = '';
        empty.style.display = socialPosts.length ? 'none' : 'block';
        socialPosts.forEach(post => {
          const row = document.createElement('tr');
          const publishDate = new Date(post.publishAt);
          const statusClass = post.status === 'Scheduled' ? 'badge-warning' : 'badge-success';
          row.innerHTML = `
            <td><span class="badge badge-info">${escapeSocialHtml(post.type)}</span></td>
            <td>${escapeSocialHtml(post.platform)}</td>
            <td><strong>${escapeSocialHtml(post.title)}</strong></td>
            <td>${publishDate.toLocaleString()}</td>
            <td><span class="badge ${statusClass}">${escapeSocialHtml(post.status)}</span></td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="deleteSocialPost(${post.id})">Delete</button></td>`;
          tbody.appendChild(row);
        });
      }

      function deleteSocialPost(id) {
        socialPosts = socialPosts.filter(post => post.id !== id);
        localStorage.setItem('tlfSocialPosts', JSON.stringify(socialPosts));
        renderSocialPosts();
      }

      function clearSocialPosts() {
        if (!socialPosts.length || !confirm('Clear all social media post records?')) return;
        socialPosts = [];
        localStorage.removeItem('tlfSocialPosts');
        renderSocialPosts();
      }

      function resetSocialPostForm() {
        document.getElementById('socialPostForm').reset();
        document.getElementById('socialScheduleMode').value = 'now';
        toggleSocialSchedule();
        updateSocialPreview();
      }

      function escapeSocialHtml(value) {
        return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
      }

      ['socialPostTitle','socialPostContent','socialPostHashtags'].forEach(id => {
        document.addEventListener('input', function(event) {
          if (event.target && event.target.id === id) updateSocialPreview();
        });
      });

      document.addEventListener('DOMContentLoaded', renderSocialPosts);

      // 6. Donation Fields Management
      function toggleDonorFields() {
        const donorType = document.getElementById('donorType').value;
        const citizenFields = document.getElementById('citizenFields');
        const corporateFields = document.getElementById('corporateFields');
        clearErrorMessages();

        if (donorType === 'corporate') {
          citizenFields.style.display = 'none';
          corporateFields.style.display = 'block';
        } else if (donorType === 'citizen') {
          citizenFields.style.display = 'block';
          corporateFields.style.display = 'none';
        } else {
          citizenFields.style.display = 'none';
          corporateFields.style.display = 'none';
        }
      }

      function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.text-danger');
        errorElements.forEach(el => {
          el.style.display = 'none';
          el.innerText = '';
        });
      }

      function showError(id, message) {
        const errElem = document.getElementById(id);
        if (errElem) {
          errElem.innerText = message;
          errElem.style.display = 'block';
        }
      }

      function validateAndSubmitForm(event) {
        event.preventDefault();
        clearErrorMessages();
        let isValid = true;
        const donorType = document.getElementById('donorType').value;
        const amount = document.getElementById('donationAmount').value.trim();
        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!donorType) {
          showError('donorTypeErr', 'Please select a valid donor type.');
          isValid = false;
        }

        if (donorType === 'citizen') {
          const name = document.getElementById('citizenName').value.trim();
          const phone = document.getElementById('citizenPhone').value.trim();
          const email = document.getElementById('citizenEmail').value.trim();
          const address = document.getElementById('citizenAddress').value.trim();
          const occupation = document.getElementById('citizenOccupation').value.trim();

          if (!name) { showError('citizenNameErr', 'Please enter your full name.'); isValid = false; }
          if (!phone || !phoneRegex.test(phone)) { showError('citizenPhoneErr', 'Enter a valid 10-digit mobile number.'); isValid = false; }
          if (!email || !emailRegex.test(email)) { showError('citizenEmailErr', 'Enter a valid email address.'); isValid = false; }
          if (!address) { showError('citizenAddressErr', 'Please enter your Address.'); isValid = false; }
          if (!occupation) { showError('citizenOccupationErr', 'Please enter your occupation.'); isValid = false; }
        }

        if (donorType === 'corporate') {
          const corpName = document.getElementById('corpName').value.trim();
          const corpContact = document.getElementById('corpContact').value.trim();
          const corpPhone = document.getElementById('corpPhone').value.trim();
          const corpEmail = document.getElementById('corpEmail').value.trim();
          const corpAddress = document.getElementById('corpAddress').value.trim();

          if (!corpName) { showError('corpNameErr', 'Please enter company name.'); isValid = false; }
          if (!corpContact) { showError('corpContactErr', 'Please enter contact person name.'); isValid = false; }
          if (!corpPhone || !phoneRegex.test(corpPhone)) { showError('corpPhoneErr', 'Enter a valid 10-digit corporate phone number.'); isValid = false; }
          if (!corpEmail || !emailRegex.test(corpEmail)) { showError('corpEmailErr', 'Enter a valid corporate email.'); isValid = false; }
          if (!corpAddress) { showError('corpAddressErr', 'Please enter office address.'); isValid = false; }
        }

        if (!amount || parseFloat(amount) <= 0) {
          showError('amountErr', 'Please enter a valid donation amount in INR.');
          isValid = false;
        }

        if (isValid) {
          const record = {
            donorType,
            amount: parseFloat(amount),
            currency: 'INR'
          };
          if (donorType === 'citizen') {
            record.name = document.getElementById('citizenName').value.trim();
            record.phone = document.getElementById('citizenPhone').value.trim();
            record.email = document.getElementById('citizenEmail').value.trim();
            record.address = document.getElementById('citizenAddress').value.trim();
            record.occupation = document.getElementById('citizenOccupation').value.trim();
          } else {
            record.company = document.getElementById('corpName').value.trim();
            record.contactPerson = document.getElementById('corpContact').value.trim();
            record.phone = document.getElementById('corpPhone').value.trim();
            record.email = document.getElementById('corpEmail').value.trim();
            record.address = document.getElementById('corpAddress').value.trim();
          }
          TLFData.add('donations', record);
          alert('Form validated successfully! Donation record saved to the TLF Admin data store. Proceeding to Payment Gateway.');
        }
        return isValid;
      }

      // 7. Volunteer EIILM Condition Handler
      function handleEiilmCheck() {
        const answer = document.getElementById('eiilmCheck').value;
        const noNotice = document.getElementById('noEiilmNotice');
        const yesFields = document.getElementById('yesVolunteerFields');

        if (answer === 'no') {
          noNotice.style.display = 'block';
          yesFields.style.display = 'none';
        } else if (answer === 'yes') {
          noNotice.style.display = 'none';
          yesFields.style.display = 'block';
        } else {
          noNotice.style.display = 'none';
          yesFields.style.display = 'none';
        }
      }

      function handleVolunteerSubmit(event) {
        event.preventDefault();
        const form = document.getElementById('volunteerForm');
        const record = {page:'index.html'};
        form.querySelectorAll('input, select, textarea').forEach(el => {
          if (el.id && el.value) record[el.id] = el.value.trim();
        });
        TLFData.add('volunteers', record);
        alert('Thank you for registering as a volunteer with TLF! Your record has been saved to the TLF Admin data store.');
        form.reset();
        return false;
      }

      // ===================================================
      // 8. 24/7 AI CHATBOT LOGIC ENGINE
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

      // 9. Lifecycle Initialization
      document.addEventListener('DOMContentLoaded', () => {
        toggleDonorFields();
        handleEiilmCheck();
        Fancybox.bind("[data-fancybox]", {});
      });
// Board "Others" field toggle logic
function toggleBoardOther() {
    var boardSelect = document.getElementById('hsBoard');
    var otherBoardGroup = document.getElementById('otherBoardGroup');
    var otherBoardInput = document.getElementById('otherBoard');

    if (boardSelect && boardSelect.value === 'Others') {
        otherBoardGroup.style.display = 'block';
        otherBoardInput.setAttribute('required', 'true');
    } else if (otherBoardGroup) {
        otherBoardGroup.style.display = 'none';
        otherBoardInput.removeAttribute('required');
    }
}

// Skill "Others" field toggle logic
function toggleSkillOther(checkbox) {
    var otherSkillGroup = document.getElementById('otherSkillGroup');

    if (checkbox.checked) {
        otherSkillGroup.style.display = 'block';
    } else {
        otherSkillGroup.style.display = 'none';
    }
}

// Form Submission Confirmation
document.addEventListener('DOMContentLoaded', function() {
    var volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your application has been submitted and is pending verification by the admin.');
        });
    }
});