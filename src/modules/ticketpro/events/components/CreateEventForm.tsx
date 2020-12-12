import React from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "../../../../configs/routes";
import '../../../../scss/createEventForm.scss'

interface Props {
    params: undefined;
    onUpdateFilter(params: undefined): void;
    loading?: boolean;
}


const CreateEventForm: React.FunctionComponent = () => {

    const { register } = useForm();
    return (
        <form action={ROUTES.createEventInfo}>
            <h1>Tạo sự kiện</h1>
            <label>Tên sự kiện</label>
            <input name="firstName" ref={register} />
            <label>Tên địa điểm</label>
            <input name="lastName" ref={register} />
            <label>Địa chỉ</label>
            <input name="lastName" ref={register} />
            <label>Thể loại sự kiện</label>
            <input
                multiple

                name="event"
                list="email"
            />
            <datalist id="email">
                <option value="Sân khấu" />
                <option value="Ngoài trời" />
                <option value="Nghệ thuật" />
                <option value="Nhạc sống" />
            </datalist>
            <input type="submit" value="Tạo sự kiện" />
        </form>
    );
};

export default CreateEventForm;