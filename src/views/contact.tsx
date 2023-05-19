import { Component, ReactNode } from "react";
import Form from '../components/form'

export default class Contact extends Component {
  render(): ReactNode {
    return (
      <>
        <div id="contact">
          <Form />
        </div>
      </>
    )
  }
}
