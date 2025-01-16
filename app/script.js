document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
     const pages = document.querySelectorAll('.page');
    const modal = document.getElementById('order-modal');
    const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop');
      document.body.appendChild(backdrop);
      const parallaxElements = document.querySelectorAll('.parallax-bg');


  const orderButton = document.getElementById('order-now');
      const closeButton = document.querySelector('.close-button');
   const orderForm = document.getElementById('order-form');

      function showPage(pageId) {
           pages.forEach(page => {
               page.classList.remove('active');
          });
       const targetPage = document.getElementById(pageId);
     if (targetPage) {
          targetPage.classList.add('active');
        }
       }

        showPage('main-page');
// Modal Logic
  orderButton.addEventListener('click', (e) => {
        e.preventDefault();
     modal.classList.add('show');
   backdrop.classList.add('show');
});
  closeButton.addEventListener('click', () => {
   modal.classList.remove('show');
       backdrop.classList.remove('show');
    });

   backdrop.addEventListener('click', () => {
        modal.classList.remove('show');
        backdrop.classList.remove('show');
       });
orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(orderForm);
      fetch('send_email.php', {
            method: 'POST',
             body: formData,
         })
        .then((response) => {
            if (!response.ok) throw new Error('Ошибка сети');
              return response.text();
     })
      .then(() => {
               alert('Заказ отправлен успешно!');
                 modal.classList.remove('show');
             backdrop.classList.remove('show');
                orderForm.reset();
          })
           .catch((error) => {
             alert('Ошибка при отправке заказа: ' + error.message);
           });
   });
// navigation logic
   links.forEach(link => {
  link.addEventListener('click', (e) => {
       e.preventDefault();
           const targetId = link.getAttribute('href').substring(1);
              showPage(targetId);
       // Scroll to top of the section
       const targetSection = document.getElementById(targetId);
           if (targetSection) {
                  window.scrollTo({
                      top: targetSection.offsetTop,
                      behavior: 'smooth'
                   });
           }
          });
  });

// parallax animation
 function updateParallax() {
          if(window.innerWidth < 600){
             parallaxElements.forEach(element =>{
                  element.style.transform = `scale(1)`;
                });
               return;
           }
      document.querySelectorAll('.parallax').forEach(section => {
         const bg = section.querySelector('.parallax-bg');
          if (bg) {
                const speed = 0.35;
                const sectionTop = section.getBoundingClientRect().top;
              const bgHeight = bg.offsetHeight
               let offsetY = Math.abs(sectionTop * speed)
            bg.style.transform = `translateY(${offsetY}px) scale(1.1)`;

              if(bgHeight + (offsetY * 2 ) < window.innerHeight) {
                      bg.style.transform = `scale(1.0)`;
                   bg.style.transition = `transform .3s`
                 }else{
                    bg.style.transition = `transform .5s ease`
                }
           }
      });
    }

  // Initial parallax call and scrolling
  updateParallax()
   window.addEventListener('scroll', updateParallax);
   window.addEventListener('resize', updateParallax);

});