document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll('#contactForm, #contactFormIndex, #contactFormServices');

    forms.forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success === "true") {
                    form.innerHTML = `
                        <div class="text-center py-12 space-y-4">
                            <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                ✓
                            </div>
                            <h3 class="text-2xl font-bold text-heading">Message Sent!</h3>
                            <p class="text-paragraph">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                        </div>
                    `;
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }

            } catch (error) {
                alert("Oops! Submission failed. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    });
});
