import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";

const MyDatalistInput = (props) => {


    return (
        <DatalistInput
            placeholder={ props.placeDataList }
            label={props.labelDataList}
            onClick={ () => props.triggerFetch () }
            onSelect={ (item) => props.handleForm ( props.handleFormName , props.choice === "id" ? item.id : item.value ) }
            items={ props.arrayComuniList }
        />
    );
};

export default MyDatalistInput;
