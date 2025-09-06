import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"

export const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    console.log(elements);

    const [loading, setLoading] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(null);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Omitimos return_url
            },
            redirect: 'if_required'
        });

        if (result.error) {
            // Si hay un error, establece el estado con el mensaje de error
            setPaymentStatus(result.error.message);
            console.error(result.error.message);
        } else {
            // Aquí puedes manejar el resultado del pago
            // Puedes verificar el estado de la confirmación de pago
            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setPaymentStatus("Pago exitoso!");
                setTimeout(() => {
                    alert("Pago Exitoso")
                }, 1000)
                console.log("pago exitoso");

                // Aquí puedes realizar otras acciones, como actualizar el estado de la aplicación
                // o mostrar un modal de agradecimiento sin redirigir.
            } else {
                setPaymentStatus("El pago no se pudo completar.");
                setTimeout(() => {
                    alert("Algo salio mal")
                }, 1000)
            }
        }
    };

    return (
        <form className="w-50 bg-dark mx-auto p-3" onSubmit={handleSubmit}>
            <PaymentElement />
            <button className="btn btn-secondary w-100 mt-2" type="submit" disabled={!stripe || loading}>Pagar</button>
        </form>
    );
}