// import React, { useState } from 'react';
// import { useAddTransaction } from '../../../hooks/useAddTransaction';
// import { useGetTransactions } from '../../../hooks/useGetTransactions';
// import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
// import { signOut } from 'firebase/auth';
// import { auth } from '../../../config/firebase-config';
// import { useNavigate } from 'react-router-dom';
// import './styles.css';

// export const ExpenseTracker = () => {
//     const { addTransaction } = useAddTransaction();
//     const { transactions, transactionTotal } = useGetTransactions();
//     const { name, profilePhoto } = useGetUserInfo();
//     const navigate = useNavigate();

//     const [description, setDescription] = useState("");
//     const [transactionAmount, setTransactionAmount] = useState(0);
//     const [transactionType, setTransactionType] = useState("expense");

//     const { balance, income, expense } = transactionTotal;

//     const onSubmit = (e) => {
//         e.preventDefault();
//         addTransaction({
//             description,
//             transactionAmount,
//             transactionType
//         });
//         setDescription("");
//         setTransactionAmount(0);
//     };

//     const signUserOut = async () => {
//         try {
//             await signOut(auth);
//             localStorage.clear();
//             navigate("/");
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <>
//             <div className='navbar'>
//                 <h1>{name}'s Expense Tracker</h1>
//                 {profilePhoto && (
//                     <div className='profile'>
//                         <img className='profile-photo' src={profilePhoto} alt='Profile' />
//                         <button className='sign-out-button' onClick={signUserOut}>Sign Out</button>
//                     </div>
//                 )}
//             </div>

//             <div className='main-content'>
//                 <div className='card'>
//                     <div className='balance'>
//                         <h3>Your Balance</h3>
//                         {balance >= 0 ? (
//                             <h2>${balance}</h2>
//                         ) : (
//                             <h2>-${balance * -1}</h2>
//                         )}
//                     </div>
//                     <div className='summary'>
//                         <div className='income'>
//                             <h4>Income</h4>
//                             <p>${income}</p>
//                         </div>
//                         <div className='expenses'>
//                             <h4>Expense</h4>
//                             <p>${expense}</p>
//                         </div>
//                     </div>
//                     <form className='add-transaction' onSubmit={onSubmit}>
//                         <input
//                             type='text'
//                             placeholder='Description'
//                             value={description}
//                             required
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                         <input
//                             type='number'
//                             placeholder='Amount'
//                             value={transactionAmount}
//                             required
//                             onChange={(e) => setTransactionAmount(e.target.value)}
//                         />
//                         <div className='radio-group'>
//                             <input
//                                 type='radio'
//                                 id='expense'
//                                 value='expense'
//                                 checked={transactionType === 'expense'}
//                                 onChange={(e) => setTransactionType(e.target.value)}
//                             />
//                             <label htmlFor='expense'>Expense</label>
//                             <input
//                                 type='radio'
//                                 id='income'
//                                 value='income'
//                                 checked={transactionType === 'income'}
//                                 onChange={(e) => setTransactionType(e.target.value)}
//                             />
//                             <label htmlFor='income'>Income</label>
//                         </div>
//                         <button type='submit'>Add Transaction</button>
//                     </form>
//                 </div>

//                 <div className='transactions'>
//                     <h3>Transactions</h3>
//                     <ul>
//                         {transactions.map((transaction) => {
//                             const { description, transactionAmount, transactionType } = transaction;
//                             return (
//                                 <li key={description}>
//                                     <h4>{description}</h4>
//                                     <p>
//                                         ${transactionAmount} . 
//                                         <label style={{ color: transactionType === 'expense' ? '#e74c3c' : '#27ae60' }}>
//                                             {transactionType}
//                                         </label>
//                                     </p>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// };

import React, { useState } from 'react';
import { useAddTransaction } from '../../../hooks/useAddTransaction';
import { useGetTransactions } from '../../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotal } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const { balance, income, expense } = transactionTotal;

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType
        });
        setDescription("");
        setTransactionAmount(0);
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('auth'); // Clear only 'auth' data
            navigate('/');
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };

    return (
        <>
            <div className='navbar'>
                <h1>{name ? `${name}'s Expense Tracker` : "Expense Tracker"}</h1>
                {profilePhoto && (
                    <div className='profile'>
                        <img className='profile-photo' src={profilePhoto} alt='Profile' />
                        <button className='sign-out-button' onClick={signUserOut}>Sign Out</button>
                    </div>
                )}
            </div>

            <div className='main-content'>
                <div className='card'>
                    <div className='balance'>
                        <h3>Your Balance</h3>
                        {balance !== undefined ? (
                            <h2>${balance >= 0 ? balance : `-${balance * -1}`}</h2>
                        ) : (
                            <h2>Loading...</h2>
                        )}
                    </div>
                    <div className='summary'>
                        <div className='income'>
                            <h4>Income</h4>
                            <p>${income !== undefined ? income : 'Loading...'}</p>
                        </div>
                        <div className='expenses'>
                            <h4>Expense</h4>
                            <p>${expense !== undefined ? expense : 'Loading...'}</p>
                        </div>
                    </div>
                    <form className='add-transaction' onSubmit={onSubmit}>
                        <input
                            type='text'
                            placeholder='Description'
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type='number'
                            placeholder='Amount'
                            value={transactionAmount}
                            required
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <div className='radio-group'>
                            <input
                                type='radio'
                                id='expense'
                                value='expense'
                                checked={transactionType === 'expense'}
                                onChange={(e) => setTransactionType(e.target.value)}
                            />
                            <label htmlFor='expense'>Expense</label>
                            <input
                                type='radio'
                                id='income'
                                value='income'
                                checked={transactionType === 'income'}
                                onChange={(e) => setTransactionType(e.target.value)}
                            />
                            <label htmlFor='income'>Income</label>
                        </div>
                        <button type='submit'>Add Transaction</button>
                    </form>
                </div>

                <div className='transactions'>
                    <h3>Transactions</h3>
                    <ul>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => {
                                const { description, transactionAmount, transactionType } = transaction;
                                return (
                                    <li key={description}>
                                        <h4>{description}</h4>
                                        <p>
                                            ${transactionAmount} . 
                                            <label style={{ color: transactionType === 'expense' ? '#e74c3c' : '#27ae60' }}>
                                                {transactionType}
                                            </label>
                                        </p>
                                    </li>
                                );
                            })
                        ) : (
                            <p>No transactions available</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};




