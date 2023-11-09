// ContractComponent.js

import React, { useState } from 'react';
import './ContractPage.css'; // Import the CSS file

const ContractComponent = ({ onAccept, onReject }) => {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setRejected(false);

  };


  const contractText = `
    EMPLOYMENT CONTRACT AGREEMENT

    THIS EMPLOYMENT CONTRACT (the "Contract") is made and entered into by and between [Hospital Name], a [Type of Entity] ("Employer"), and [Employee Name] ("Employee") collectively referred to as the "Parties."

    1. POSITION AND RESPONSIBILITIES:
    1.1 Employee agrees to be employed as a [Position] and will perform the following responsibilities: [List of Responsibilities].
    1.2 Employee will report directly to [Supervisor's Name] and collaborate with other team members.

    2. SALARY AND BENEFITS:
    2.1 Employer agrees to pay Employee a monthly salary of $10,000, payable on the [Payment Schedule].
    2.2 Employee will be eligible for health benefits, retirement plans, and other benefits as outlined in the employee handbook.

    3. DURATION OF EMPLOYMENT:
    3.1 The term of this Contract shall commence on [Start Date] and continue for a period of 12 months, terminating on [End Date].
    3.2 Either party may terminate this Contract with a notice period of [Notice Period] days for any reason.

    ...

    10. ACCEPTANCE:
    10.1 Employee may accept or reject this Contract by clicking the respective buttons below.
    10.2 By accepting this Contract, Employee acknowledges understanding and agrees to abide by the terms and conditions outlined herein.

    `;

  return (
    <div className="contract-container">
      <h1 className="contract-title">Employment Contract</h1>
      <pre className="contract-text">{contractText}</pre>

      {!accepted && !rejected && (
        <div className="button-container">
          <button className="accept-button" onClick={handleAccept}>Accept</button>

        </div>
      )}

      {accepted && <p className="message success">You have accepted the contract. Welcome aboard!</p>}
  
    </div>
  );
};

export default ContractComponent;
