import Axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "../../../../configs/routes";
import '../../../../scss/createEventForm.scss';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { Select, MenuItem, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

}));

const CreateEventForm: React.FunctionComponent = () => {
    const [eventName, setEventName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [eventCategory, setEventCategory] = React.useState<any[]>();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        Axios.get(API_PATHS.getCategory)
            .then(response => {
                console.log(response.data)
                if (response.data.statusCode = SUCCESS_CODE) {
                    setEventCategory(response.data.data)
                    console.log(eventCategory)
                }
            })
            .catch(e => {

            })
    }, [])

    const { register } = useForm();

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl>
            <h1>Tạo sự kiện</h1>
            <label>Tên sự kiện</label>
            <input name="eventName" ref={register} onChange={(e) => setEventName(e.target.value)} />
            <label>Tên địa điểm</label>
            <input name="location" ref={register} onChange={(e) => setLocation(e.target.value)} />
            <label>Địa chỉ</label>
            <input name="address" ref={register} onChange={(e) => setAddress(e.target.value)} />
            <label>Thể loại sự kiện</label>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={selectedCategory}
                onChange={handleChange}
                style={{ minWidth: 500, backgroundColor: "white", minHeight: 38 }}

            >
                {
                    eventCategory?.map(element => (
                        <MenuItem value={element.id}>
                            <em>{element.name}</em>
                        </MenuItem>
                    ))
                }
            </Select>
            <div>
                <Link to={`${ROUTES.createEventInfo}/${eventName}/${location}/${address}/${selectedCategory}`} style={{ textDecoration: "none" }}>
                    <Button style={{
                        backgroundColor: "#2eab5e"
                    }}
                    >Tạo sự kiện</Button>
                </Link>
            </div>
        </FormControl>
    );
};

export default CreateEventForm;