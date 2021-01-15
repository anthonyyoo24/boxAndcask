import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { paymentSuccess } from '../actions';

//sandbox account: sb-h847gs3230218@business.example.com
//client ID: AVhQZyv64XoZAh4V-B5kB_d-2OTlryxE36UWUVrgqeVIdwR7Wk4nlKCfTOkJCw0V5s_MmMZh25LTjzdp
//secret: ELnTjTFOKKt9wLC6TwGOkToBBpC6d4hi6Qem8Xztwe-k_jNV8dJgqZyMlL0H-oA7YTpoSaszgwlEWt_B

// Personal
// sb-43xrcu3229455@personal.example.com
// ]V#Hd8?_

const PayPalButton =
  typeof window !== 'undefined' ? window.paypal.Buttons.driver('react', { React, ReactDOM }) : null;

const PayPal = (props) => {
  const dispatch = useDispatch();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: props.total,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    dispatch(paymentSuccess());

    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PayPal;
