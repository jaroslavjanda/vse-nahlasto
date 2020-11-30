import React from 'react'
import { Form, FormCheck } from 'react-bootstrap'
import { useAuth } from '../utils/auth'



export const ChangeTicketState = (owner) => {

  const { user } = useAuth()

  if ((user.user_id.toInteger === owner.toInteger)) {
    return (
      <Form>
        {['radio'].map((type) =>
         <div key={`inline-${type}`} className="mb-3">
           <FormCheck inline label="Nový" type={type} id={`inline-${type}-1`}/>
           <FormCheck inline label="V progressu" type={type} id={`inline-${type}-1`}/>
           <FormCheck inline disabled label="Vyřešeno" type={type} id={`inline-${type}-1`}/>
         </div>
        )}
      </Form>
    )
  } else {
    return null
  }
}
