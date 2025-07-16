import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { SaveDiskIcon } from "./icons/SaveDiskIcon";
import GoogleMapReact from "google-map-react";
import { MapPinIcon } from "./icons/MapPinIcon";

export default class FormGroup extends Component {
  // toDo Manejar switch, select inputs
  // toDo Implementar OnClick, OnChange en todos los tipos de componentes
  render() {
    const type = this.props.type || "block";
    const inputSize = this.props.inputSize || "sm";
    const label = this.props.label || "";
    const hint = this.props.hint || "";
    const required = this.props.required || "";
    const inputType = this.props.inputType || "text";
    const inputValue = this.props.inputValue || "";
    const inputError = this.props.inputError || "";
    const inputName = this.props.inputName || "";
    const inputPlaceholder = this.props.inputPlaceholder || "";
    const optionList = this.props.optionList || [];
    const optionCheckedList = this.props.optionCheckedList || [];
    const disabled = this.props.disabled || false;
    const saveBtnVisible = this.props.saveBtnVisible === false ? false : true; // Existe un problema al usar || si la condicion que se quiere por defecto es true. Al enviar un parametro false lo ignora y setea true.
    const saveBtnDisabled = this.props.saveBtnDisabled || false;
    const onClickSaveBtn = this.props.onClickSaveBtn;
    const onChangeInputValue = this.props.onChangeInputValue;
    const onMapClick = this.props.onMapClick;
    const checked = this.props.checked;
    const markers = this.props.markers;

    const className = this.props.className || "";

    function handleInputRenderByInputType(inputType) {
      if (
        inputType === "text" ||
        inputType === "number" ||
        inputType === "email" ||
        inputType === "password"
      ) {
        return (
          <input
            type={inputType}
            disabled={disabled}
            name={inputName}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onChangeInputValue}
            className="border-[1px] w-full p-2 rounded-md"
          />
        );
      }
      if (inputType === "textarea") {
        return (
          <textarea
            disabled={disabled}
            name={inputName}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onChangeInputValue}
            className="border-[1px] w-full p-2 rounded-md h-20"
          />
        );
      }
      if (inputType === "select") {
        return (
          <Form.Select
            disabled={disabled}
            size={inputSize}
            name={inputName}
            value={inputValue}
            onChange={onChangeInputValue}
          >
            <option disabled value=""></option>
            {optionList.map(({ label, value }, index) => {
              return (
                <option key={index} value={value}>
                  {label}
                </option>
              );
            })}
          </Form.Select>
        );
      }
      if (inputType === "switch") {
        return (
          <Form.Check
            disabled={disabled}
            checked={checked}
            type={inputType}
            label={label}
            onChange={onChangeInputValue}
          />
        );
      }
      if (inputType === "geopoint") {
        const defaultData = { coords: { lat: 4.73, lng: -74.03 }, zoom: 6 };
        // const Marker = ({ text }) => (
        //   <div
        //     style={{ width: "20px", height: "20px", color: "red" }}
        //   >
        //     <MapPinIcon />
        //   </div>
        // );

        return (
          <div className="border p-2">
            <div className="mb-2" style={{ height: "570px", width: "100%" }}>
              <GoogleMapReact
                // key={new Date().getTime()}
                bootstrapURLKeys={{
                  key: process.env['REACT_APP_GMAPS_API_KEY'] || '',
                }}
                defaultCenter={defaultData.coords}
                defaultZoom={defaultData.zoom}
                onClick={onMapClick}
              >
                {/* {markers.map((marker, index) => {
                  return (
                    <Marker
                      key={index}
                      lat={marker.lat}
                      lng={marker.lng}
                      text={"Hola"}
                    ></Marker>
                  );
                })} */}
              </GoogleMapReact>
            </div>
            {markers.length > 0 && (
              <>
                <div>
                  <Form.Label className="mb-0">Latitud</Form.Label>
                  <Form.Control
                    disabled={true}
                    size="sm"
                    type="number"
                    placeholder="Latitud"
                    value={markers[0].lat}
                  />
                </div>
                <div>
                  <Form.Label className="mb-0">Longitud</Form.Label>
                  <Form.Control
                    disabled={true}
                    size="sm"
                    type="number"
                    placeholder="Longitud"
                    value={markers[0].lng}
                  />
                </div>
              </>
            )}
          </div>
        );
      }
      if (inputType === "radio" || inputType === "checkbox") {
        return (
          <>  
            {optionList.map(({ label, value }) => (
              <div key={`opt-${label}`}>
                <input
                  type={inputType}
                  disabled={disabled}
                  value={value}
                  name={inputName}
                  checked={optionCheckedList.includes(value)}
                  onChange={onChangeInputValue}
                />
                <label for={value} className="ml-2 text-sm">
                  {label}
                </label>
              </div>
            ))}
          </>
        );
      }
      if (inputType === "file") {
        return (
          <Form.Control
            type={inputType}
            size={inputSize}
            name={inputName}
            onChange={onChangeInputValue}
          />
        );
      }
    }

    if (type === "block") {
      return (
        <Form.Group className={className + " mb-3"}>
          {inputType !== "switch" && (
            <Form.Label className="mb-0">
              {label}
              {required && <span className="fs-6 text-danger">*</span>}
            </Form.Label>
          )}
          <p className="fw-light fst-italic mb-0">{hint}</p>
          {handleInputRenderByInputType(inputType)}
          <p className="fw-light fst-italic mb-0 text-danger">{inputError}</p>
        </Form.Group>
      );
    }
    if (type === "floating") {
      return (
        <FloatingLabel label={label} className={className + " mb-3"}>
          {handleInputRenderByInputType(inputType)}
        </FloatingLabel>
      );
    }
    if (type === "flex") {
      return (
        <div className={className + " mb-3"}>
          <div className="grid grid-cols-12 gap-4">
            {inputType !== "switch" && (
              <label className="col-span-5">{label}</label>
            )}
            <div className="col-span-5">
              {handleInputRenderByInputType(inputType)}
            </div>
            {saveBtnVisible && (
              <div className="col-span-2">
                <button
                  disabled={saveBtnDisabled}
                  variant="success"
                  onClick={onClickSaveBtn}
                  className={`p-2 text-white rounded-md bg-[#6e6c35] border-1 border-dark ${
                    saveBtnDisabled
                      ? "bg-[#6ab190] cursor-not-allowed "
                      : "bg-green-600 text-white"
                  }`}
                >
                  <SaveDiskIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}
