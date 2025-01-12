import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { AddMedicine } from "../../components/shared/AddMedicine";
import { useFetch } from "../../hooks/useFetch";
import { TablePharmacy } from "../../components/shared/TablePharmacy";


export const Pharmacy = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [unitPrices, setUnitPrices] = useState({}); // Store unit prices for medicines
    const [inputFiledSelected, setInputFiledSelected] = useState(null);
     const [isModalCreateOpOpen, setIsModalCreateOpOpen] = useState(false);
     const [isModalConsultedOp, setIsModalConsultedOp] = useState(false);
     const [consOp, isLoading, error] = useFetch('/pharmacy/get-consulted-op');
     console.log("consOp",consOp);
     

    const user = {
        save_api: "/pharmacy/create-pharmacy-bill",
        drug_route: "/pharmacy/get-all-drugs",
        signup_route: "/signup",
    };

    const { register, control, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            op_number: "",
            medicines: [{ medicine: "", medicine_name: "", quantity: 1, unit_price: 0, total_price: 0 }],
            total_amount: 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "medicines",
    });
    const formValues = watch();
    // //   const navigate = useNavigate();

    const fetchDrugData = async () => {
        try {
            const response = await axiosInstance({ method: "GET", url: user.drug_route });
            
            setMedicines(response?.data?.data);
            setFilteredMedicines(response?.data?.data);
            const prices = {};
            medicines.forEach((med) => {
                prices[med._id] = med.price; // Assuming backend returns _id and price
            });
            setUnitPrices(prices);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log("unitPrices===", unitPrices);
    console.log("medicine===", medicines);
    console.log("filteredList====", filteredMedicines);

    // console.log("FORM VAL===", formValues);

    useEffect(() => {
        fetchDrugData();
    }, []);

    useEffect(() => {
        // Update total price for each medicine
        const updatedMedicines = formValues.medicines.map((item) => {
            const unitPrice = unitPrices[item.medicine] || 0;
            const totalPrice = unitPrice * item.quantity;
            return { ...item, unit_price: unitPrice, total_price: totalPrice };
        });

        const totalAmount = updatedMedicines.reduce((sum, item) => sum + item.total_price, 0);
        setValue("medicines", updatedMedicines);
        setValue("total_amount", totalAmount);
    }, [unitPrices, setValue]);

    const handleSearchChange = (index, value) => {
        setInputFiledSelected(index);
        // Filter medicines by search input
        const filtered = medicines.filter((med) => {
            if (med.drug_name.toLowerCase().includes(value.toLowerCase())) {
                return med;
            }
        });

        setFilteredMedicines(filtered);
        // const newFilteredList = filteredMedicines.map((med, i) => ({ ...med, isOpen: i == index }));
        // setFilteredMedicines(newFilteredList);

        // Update medicine name and clear the medicine ID if the search changes
        setValue(`medicines.${index}.medicine_name`, value);
        setValue(`medicines.${index}.medicine`, "");
    };

    const selectMedicine = (index, medicine) => {
        setValue(`medicines.${index}.medicine`, medicine._id);
        setValue(`medicines.${index}.medicine_name`, medicine.drug_name);
        setValue(`medicines.${index}.unit_price`, medicine.price);

        setFilteredMedicines([]);
        // setValue(`medicines.${index}.total_price`, medicine.price*quantity);
    };
    // console.log("filter",filteredMedicines);

    const refreshPage = () => {
        window.location.reload(false);
      };


    const onSubmit = async (data) => {
        try {
            console.log(data, "====data");

              const response = await axiosInstance({ method: "POST", url: user.save_api, data });
            console.log(response, "====response");
              toast.success("bill generated successfully");
              refreshPage()
            //   navigate(user.profile_route);
        } catch (error) {
              toast.error("Billing failed");
            console.log(error);
        }
    };

    const closeOpModal=()=>{
      setIsModalCreateOpOpen(false)
    }
    const togleOp=()=>{
      setIsModalCreateOpOpen(true)
    }
    const togleCons=()=>{
        setIsModalConsultedOp(true)
    }
    const closeConsModal=()=>{
        setIsModalConsultedOp(false)
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pharmacy Form</h1>
            <div className="flex gap-5 ml-40">
            <button onClick={togleOp} className="btn btn-warning" >
                Add new medicine
            </button>
            <button onClick={togleCons} className="btn btn-accent" >
                Consulted OP
            </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* OP Number Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">OP Number</span>
                    </label>
                    <input type="text" className="input input-bordered" {...register("op_number", { required: true })} />
                </div>

                {/* Medicines Table */}
                <div>
                    <h2 className="text-lg font-bold mb-2">Medicines</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Search Medicine</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((item, index) => (
                                <tr key={item.id}>
                                    {/* Search Medicine */}
                                    <td>
                                        <div className="relative my-10">
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                // {...register(`medicines.${index}.medicine_name`, { required: true })}
                                                onChange={(e) => handleSearchChange(index, e.target.value)}
                                                placeholder="Search medicine"
                                                value={formValues.medicines[index]?.medicine_name || ""}
                                            />
                                            {/* {formValues.medicines[index]?.medicine_name && ( */}
                                            {inputFiledSelected == index && (
                                                <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-40 overflow-y-auto">
                                                    {filteredMedicines.map((med) => (
                                                        <li
                                                            key={med._id}
                                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => selectMedicine(index, med)}
                                                        >
                                                            {med.drug_name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </td>

                                    {/* Quantity Input */}
                                    <td>
                                        <input
                                            type="number"
                                            className="input input-bordered"
                                            {...register(`medicines.${index}.quantity`, { required: true, min: 1 })}
                                            onChange={(e) => {
                                                setValue(`medicines.${index}.quantity`, parseInt(e.target.value, 10));
                                            }}
                                        />
                                    </td>

                                    {/* Unit Price */}
                                    <td>
                                        <span>{formValues.medicines[index]?.unit_price || 0}</span>
                                    </td>

                                    {/* Total Price */}
                                    <td>
                                        <span>{formValues.medicines[index]?.unit_price * formValues.medicines[index]?.quantity || 0}</span>
                                    </td>

                                    {/* Remove Row */}
                                    <td>
                                        <button type="button" className="btn btn-error" onClick={() => remove(index)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        type="button"
                        className="btn btn-primary mt-4"
                        onClick={() => append({ medicine: "", medicine_name: "", quantity: 1, unit_price: 0, total_price: 0 })}
                    >
                        Add Medicine
                    </button>
                </div>

                {/* Total Amount */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Total Amount</span>
                    </label>
                    <input type="text" className="input input-bordered" {...register("total_amount")} />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
            {isModalCreateOpOpen && (
                    <div className="modal modal-open">
                      <div className="modal-box ">
                        <div className="modal-action">
                          <button className="btn bg-red-700" onClick={closeOpModal}>Close</button>
                        </div>
                        <AddMedicine/>
                      </div>
                    </div>
                  )}
            {isModalConsultedOp && (
                    <div className="modal modal-open">
                      <div className="modal-box ">
                        <div className="modal-action">
                          <button className="btn bg-red-700" onClick={closeConsModal}>Close</button>
                        </div>
                        <TablePharmacy state={consOp}/>
                      </div>
                    </div>
                  )}
        </div>
    );
};
