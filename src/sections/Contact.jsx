import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';


import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
    const formRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [loading, setLoading] = useState(false);
    const { alert, showAlert, hideAlert } = useAlert();


    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
      };

      const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
            from_name: form.name,
            to_name: 'Sujit Sah',
            from_email: form.email,
            to_email: 'sah.sujit1388@gmail.com',
            message: form.message,
          },

          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
        )

        .then(
            () => {
              setLoading(false);
              showAlert({
                show: true,
                text: 'Thank you for your message 😃',
                type: 'success',
              });
    
              setTimeout(() => {
                hideAlert(false);
                setForm({
                  name: '',
                  email: '',
                  message: '',
                });
              }, [3000]);
            },
            (error) => {
              setLoading(false);
              console.error(error);
    
              showAlert({
                show: true,
                text: "I didn't receive your message 😢",
                type: 'danger',
              });
            },
          );
        
    
      }
  return (
    <section className="c-space my-20" id="contact">
        <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />
        <div className="max-w-xl relative z-10 sm:px-10 px-5 mt-32">
        <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-[#AFB0B6] mt-3">
            Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to
            life, I’m here to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12  flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="text-lg text-[#AFB0B6]">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1C1C21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646C] text-lg text-[#E4E4E6] shadow-[#0E0E10] shadow-2xl focus:outline-none"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg text-[#AFB0B6]">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1C1C21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646C] text-lg text-[#E4E4E6] shadow-[#0E0E10] shadow-2xl focus:outline-none"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg text-[#AFB0B6]">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#1C1C21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646C] text-lg text-[#E4E4E6] shadow-[#0E0E10] shadow-2xl focus:outline-none"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="bg-[#3A3A49] px-5 py-2 min-h-12 rounded-lg shadow-[#0E0E10] shadow-2xl flex justify-center items-center text-lg text-white gap-3" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className=" w-2.5 h-2.5 object-contain invert brightness-0" />
            </button>
          </form>

        </div>
        </div>

    </section>
  )
}

export default Contact