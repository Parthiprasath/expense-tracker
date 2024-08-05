import React from 'react';
import { useState } from 'react';
import { query, collection, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';
import { useEffect } from 'react';


export const useGetTransactions = () => {

    const[transactions, setTransactions] = useState([]);

    const[transactionTotal, setTransactionTotal] = useState({
        balance: 0.0,
        income: 0.0,
        expense: 0.0,
    });

    const transactionCollectionRef = collection(db, "transactions");

    const {userID} = useGetUserInfo();

    const getTransactions = async () => {

        let unsubscribe;

        try{
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];

                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id

                    docs.push({...data,id});

                    if(data.transactionType === "expense") {
                        totalExpense += Number(data.transactionAmount);
                    }else {
                        totalIncome += Number(data.transactionAmount);
                    }

                });

                setTransactions(docs);

                let balance = totalIncome - totalExpense;
                setTransactionTotal({
                    balance,
                    income: totalIncome,
                    expense: totalExpense,
                })
            });
        }catch(err){
            console.error(err);
        }

        return () => unsubscribe();

    }

    useEffect(() => {
        getTransactions();
    },[])

  return {transactions, transactionTotal};
}
