import React from 'react'
import "./contactPage.css"
import { toast } from 'react-hot-toast';
import ArrowBtn from '../../components/arrowBtn/arrowBtn';

const ContactPage = () => {
  const [sending, setSending] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "fb20e73e-8d98-43e6-a559-d0609ba651d1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Message sent successfully");
      event.target.reset();
      setSending(false);
    } else {
      console.log("Error", data);
      toast.error("Oops! Something went wrong. Please try again later.");
      setSending(false);
    }
  };

  return (
    <div className="contact navbarHeight mb-5">
      <div className="wrapper">
        <h1 className="title">Contact</h1>
        <div className="row  mt-4">
          <div className="col-xl-6 mx-auto col-12">
            <p className="text-start mb-4 body-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus odit cum laborum temporibus omnis laudantium. Eius
              accusamus, quisquam nobis ipsum magni
            </p>
            <div className="">
              
              <p className="text-start mb-4"><svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#0a5bd0"
                className="bi bi-envelope-fill me-1"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg> gowthamkvdl@gmail.com</p>
            </div>
            <div className="">
              <p className="text-start mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#0a5bd0"
                  className="bi bi-telephone-fill me-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                  />
                </svg>
                +91 7010399378
              </p>
            </div>
            <div className="">
              <p className="text-start mb-4 ">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" 
                height="20"
                fill="#0a5bd0"
                className="bi bi-geo-alt-fill me-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
                explicabo!
              </p>
            </div>
          </div>
          <div className="col-xl-6 mx-auto mt-sm-0 mt-4 col-12">
            <h4 className=" mb-2 d-flex ">
              Send us a message
              <div className="rocket mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#0a5bd0"
                  className="bi bi-send-fill mx-2 "
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>
              </div>
            </h4>
            <form action="" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Your Name</label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="w-100 form-control shadow-none"
                />
              </div>

              <div className="mb-3 ">
                <label htmlFor="number">Your Phone Number</label>
                <input
                  required
                  type="text"
                  id="number"
                  name="phone"
                  className="w-100 form-control shadow-none"
                />
              </div>

              <div className="mb-3 ">
                <label htmlFor="email">Your Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="w-100 form-control shadow-none"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="text">Write your message</label>
                <textarea
                  rows="4"
                  required
                  type="text"
                  id="text"
                  name="message"
                  className="w-100 form-control shadow-none"
                />
              </div>
              <ArrowBtn text="Send" type="submit" />
            </form>
            {sending && <span className="fs-5 floate-end">Sending...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage