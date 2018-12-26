import React from "react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import MenuItem from "@material-ui/core/MenuItem";

export const simpleSuggestion = (suggestion, { query, isHighlighted }) => {
  // console.log("simpleSuggestion", suggestion);
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem
      selected={isHighlighted}
      component="div"
      key={suggestion._id}
      title={suggestion._id}
    >
      <div
        style={{ display: "block", width: "100%", color: "black" }}
        title={suggestion._id}
      >
        <span>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span
                key={String(index)}
                style={{ fontWeight: 600 }}
                title={suggestion._id}
              >
                {part.text}
              </span>
            ) : (
              <strong
                key={String(index)}
                style={{ fontWeight: 400 }}
                title={suggestion._id}
              >
                {part.text}
              </strong>
            );
          })}
        </span>
      </div>
      {/* <span>{gmina}</span> */}
    </MenuItem>
  );
};

export const nameSurnameSuggestion = (suggestion, { query, isHighlighted }) => {
  const { name, surname, _id } = suggestion;
  const fullName = `${name} ${surname}`;
  const matches = match(fullName, query);
  const parts = parse(fullName, matches);

  return (
    <MenuItem selected={isHighlighted} component="div" dense title={_id}>
      <div
        style={{ display: "block", width: "100%", color: "black" }}
        title={_id}
      >
        <span title={_id}>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} title={_id} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong
                key={String(index)}
                title={_id}
                style={{ fontWeight: 300 }}
              >
                {part.text}
              </strong>
            );
          })}
        </span>
      </div>
    </MenuItem>
  );
};

export const clientSuggestion = (suggestion, { query, isHighlighted }) => {
  const { name, adr_Kod, adr_Miejscowosc } = suggestion;
  const matches = match(name, query);
  const parts = parse(name, matches);
  const matchesKod = match(adr_Kod, query);
  const partsKod = parse(adr_Kod, matchesKod);
  const matchesMiejscowosc = match(adr_Miejscowosc, query);
  const partsMiejscowosc = parse(adr_Miejscowosc, matchesMiejscowosc);

  return (
    <MenuItem selected={isHighlighted} component="div" dense>
      <div style={{ display: "block", width: "100%" }}>
        <span>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </span>
        <span style={{ float: "right" }}>
          <span style={{ fontSize: 15, marginRight: 5 }}>
            {partsKod.map((part, index) => {
              return part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              );
            })}
          </span>
          <span style={{ fontSize: 15 }}>
            {partsMiejscowosc.map((part, index) => {
              return part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              );
            })}
          </span>
        </span>
      </div>
    </MenuItem>
  );
};
