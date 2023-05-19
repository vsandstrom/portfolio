import { Component, FormEvent, ReactNode } from 'react';
import emailjs from 'emailjs-com';


export default class Form extends Component {
  matchEmail = (email: string | null) => {
    if (email != null) {
      const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      // console.log(email.matchAll(re));
      return email.matchAll(re).next().value;
    }
    return email;
  }

  sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e?.currentTarget) ?? []; 
    const json = Object.fromEntries(form?.entries());
    if (this.matchEmail(json.email.toString())) {
      emailjs.sendForm(
        "service_x7ypsww", 
        "template_wug44hb",
        e.currentTarget,
        "ywch5YJ94mXa-0Iud"
      );
      e.currentTarget.textContent = "Thanks!";
    } else {
      e.currentTarget.textContent = "Faulty email address!";
    }
  }

  render(): ReactNode {
    return (
    <div className='card form'>
      <label>
        <h5>
          Write me!
        </h5>
        <form method='post' onSubmit={this.sendEmail}>
          <input name='name' inputMode='text' autoComplete='off' placeholder={"name"}  />
          <input name='email' inputMode='email' autoComplete='off' placeholder={"email"} />
          {
            // Hack way of resizing input
          }
          {window.innerWidth <= 500 && 
            <textarea name='message' inputMode='text' placeholder={"What u want?"} rows={14} cols={20}/>
          }
          {window.innerWidth > 500 && window.innerWidth <= 1050 && 
            <textarea name='message' inputMode='text' placeholder={"What u want?"} rows={23} cols={35}/>
          }
          {window.innerWidth > 1050 && window.innerWidth <= 1250 && 
            <textarea name='message' inputMode='text' placeholder={"What u want?"} rows={23} cols={45}/>
          }
          {window.innerWidth > 1250 && window.innerWidth <= 1450 && 
            <textarea name='message'inputMode='text' placeholder={"What u want?"} rows={23} cols={60} />
          }
          {window.innerWidth > 1450 && window.innerWidth <= 1750 &&
            <textarea name='message'inputMode='text' placeholder={"What u want?"} rows={23} cols={70} />
          }
          {window.innerWidth > 1750 && 
            <textarea name='message'inputMode='text' placeholder={"What u want?"} rows={23} cols={85} />
          }
          <input id="submit" type='submit' value='SEND'/>
        </form>
      </label>
    </div>
    )
  }
}

