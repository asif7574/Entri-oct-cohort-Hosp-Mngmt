import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

export const SalesReport = () => {
  // const [salesReport, setSalesReport] = useState(null);
const [salesReport, isLoading, error] = useFetch('/admin/sales-report');
console.log(salesReport);
// console.log(salesReport[0].totalReceptionBill);

 
  return (
    <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">Monthly Sales Report</h1>
            {salesReport ? (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className='text-2xl'>
                            <tr>
                                <th>Reception Bill</th>
                                <th>Pharmacy Bill</th>
                                <th>Total Bill</th>
                            </tr>
                        </thead>
                        <tbody className='text-2xl'>
                            <tr>
                                <td>Rs-{salesReport[0]?.totalReceptionBill}</td>
                                <td>Rs-{salesReport[0]?.totalPharmacyBill}</td>
                                <td>Rs- {salesReport[0]?.totalReceptionBill+salesReport[0]?.totalPharmacyBill}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading report...</p>
            )}
        </div>
  )
}
