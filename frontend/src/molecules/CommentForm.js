import { Container, Form } from 'react-bootstrap'
import { Button } from '../atoms'
import { toast } from 'react-toastify'
import React from 'react'

export const CommentForm = () => {
  return (
    <Form>
      <Form.Group controlId="ControlInput1">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Vlož komentář"
        />
      </Form.Group>
      <Button
        className="pull-right"
        // type="submit"
        variant="success"
        onClick={() => toast.success('Komentář byl přidán.')}
      >
        POTVRDIT
      </Button>
    </Form>
  )
}
