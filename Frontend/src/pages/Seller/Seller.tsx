import style from "./Seller.module.css";
import { Button, Input, Select } from "../../components";
import { useForm } from "react-hook-form";
import { registerSeller } from "../../api/seller.api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Seller = () => {
  const { register, handleSubmit, watch } = useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const userId = useSelector((state) => state?.auth?.userData?._id);

  const handleRegisterSeller = async (data: any) => {
    try {
      const { storeLogo } = data;
      const formData = new FormData();
      formData.append("storeName", data.storeName);
      formData.append("whatsappNumber", data.whatsappNumber);
      formData.append("storeLogo", storeLogo[0]);
      formData.append("gstNumber", data.gstNumber);
      formData.append("street", data.street);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("pincode", data.pincode);
      formData.append("userId", userId);

      const response = await registerSeller(formData);
      if (response.statusCode === 200) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error calling registerSeller API:", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      setCountries(data.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: watch("country"),
        }
      );
      setStates(data.data.states);
    })();
  }, [watch("country")]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          country: watch("country"),
          state: watch("state"),
        }
      );
      setCities(data.data);
    })();
  }, [watch("state")]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegisterSeller)}>
        <Input
          placeholder="Store Name"
          label="Store Name"
          {...register("storeName", { required: true })}
        />
        <Input
          placeholder="Whatsapp Number"
          label="Whatsapp Number"
          {...register("whatsappNumber", { required: true })}
        />
        <Input
          placeholder="Store Logo"
          label="Store Logo"
          type="file"
          {...register("storeLogo", { required: true })}
        />
        <Input
          placeholder="GST Number"
          label="GST Number"
          {...register("gstNumber", { required: true })}
        />
        <Input
          placeholder="Store Address"
          label="Store Address"
          {...register("street", { required: true })}
        />
        <Select
          label="Country"
          options={countries.map((country) => country.name)}
          {...register("country", { required: true })}
        />
        <Select
          label="State"
          options={states.map((state) => state.name)}
          {...register("state", { required: true })}
        />
        <Select
          label="City"
          options={cities}
          {...register("city", { required: true })}
        />
        <Input
          placeholder="Pincode"
          label="Pincode"
          {...register("pincode", { required: true })}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Seller;
