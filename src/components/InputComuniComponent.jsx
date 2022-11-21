import { useState } from "react";
import DatalistInput from "react-datalist-input";
import { useSelector } from "react-redux";
import "react-datalist-input/dist/styles.css";

const InputComuniComponent = ({handleForm}) => {
  const [comuni, setComuni] = useState([]);
  const token = useSelector((state) => state.user.user.token);


  const maker = () => {
    let arr = []
    comuni.map((e, i) => {
        let obj = {
            id : e.nome + i,
            value : e.nome 
        }
        arr.push(obj)
    })
    return arr
  }

  const getComuniList = async () => {
    const baseEndpoint = "http://localhost:8080/api/comuni";
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "GET",
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        setComuni(data);
        console.log(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DatalistInput 
      placeholder="Municipality"
      label="Select your municipality"
      onClick={() => getComuniList()}
      onSelect={(item) => handleForm("nomeComune", item.value)}
      items={maker()}
      isExpandedStyle = {{maxHeight : 50 + "vh", overflow : "scroll", '&::WebkitScrollbar': { display : "none" }}}
    />
  );
};

export default InputComuniComponent;
