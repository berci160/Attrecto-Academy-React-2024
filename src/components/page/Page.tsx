import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import Loading from '../loader/Loader';
import { boolean } from 'yup';

interface PageProps {
    title?: string;
    noCard?: boolean;
    children: ReactNode;
    isLoading?:boolean;
}

export const Page = ({title, noCard, children,isLoading=true}: PageProps) => {

    const[loading, setLoading]=useState(false);
    const[data,setData]=useState(null);



    useEffect(()=>{

        const fetchdata=async()=>{

            setLoading(true);
            try{
                const resp = await fetch('http://localhost:5173')
                const ress = await resp.json();
                setData(ress);
                setLoading(false)
            } finally{
                setLoading(false);
            }
           
        };
        fetchdata();
      
       
    },[]);

    return (
        <div className='container pt-3'>
            {title && <h5>{title}</h5>}
            {loading?(
                <Loading/> ):(
            <div className={classNames({"card bg-white shadow p-3": !noCard})}>
                {children}
            </div>
      
            )}
              </div>
    );
};