const AcceptedPayments = () => {
    return (
      <div className="flex flex-col pt-10 md:pt-0 md:pb-18">
        <h1 className="text-[16px] font-[600]">Accepted Payments</h1>
        <div className="flex flex-row gap-4 md:mt-2">
          <img
            src="https://img.icons8.com/color/48/000000/mastercard.png"
            alt="mastercard"
            className="w-8 h-8"
          />
          <img
            src="https://img.icons8.com/color/48/000000/amex.png"
            alt="amex"
            className="w-8 h-8"
          />
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="visa"
            className="w-8 h-8"
          />
        </div>
      </div>
    );
}

export default AcceptedPayments;