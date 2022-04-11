import {
  Modal, ModalHeader, ModalBody, Button,
  ModalFooter, Input, Label,
} from 'reactstrap';
import { useState } from 'react';

const userTemplate = {
  id: '',
  email: '',
  password: '',
};

function UserModal(props) {
  const {
    isOpen, dismiss, onLogin, onRegister,
  } = props;
  if (!isOpen) return (<div />);
  const [data, setData] = useState({ ...userTemplate });
  const [mode, setMode] = useState('login');

  const onSubmit = () => {
    if (mode === 'login') onLogin(data);
    else onRegister(data);
  };

  const onChange = (key, val) => setData((prev) => ({ ...prev, [key]: val }));
  return (
    <Modal
      isOpen={Boolean(isOpen)}
      centered
    >
      <ModalHeader>
        {mode === 'login' ? 'Login to your account!' : 'Register a new account!'}
      </ModalHeader>
      <ModalBody>
        {mode === 'register' && (
          <>
            <Label>Name</Label>
            <Input
              placeholder="Name"
              onChange={(e) => onChange('name', e.target.value)}
            />
            <Label>Age</Label>
            <Input
              placeholder="21"
              type="number"
              onChange={(e) => onChange('age', e.target.value)}
            />
            <Label>License number</Label>
            <Input
              placeholder="Licence number"
              onChange={(e) => onChange('license', e.target.value)}
            />
          </>
        )}
        <Label>Email</Label>
        <Input
          placeholder="example@host.com"
          type="email"
          onChange={(e) => onChange('email', e.target.value)}
        />
        <Label>Password</Label>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => onChange('password', e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={() => { setMode((prev) => (prev === 'login' ? 'register' : 'login')); }}>
          {mode === 'login' ? 'Register' : 'Login'}
        </Button>
        <Button
          color="primary"
          onClick={() => { onSubmit(data); dismiss(); }}
        >
          Submit
        </Button>
        {' '}
        <Button onClick={dismiss}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default UserModal;
