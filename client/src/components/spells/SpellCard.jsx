import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import StatBlock from "./StatBlock";

import "./SpellCard.css";

export default function SpellCard({ spell }) {
  const navigate = useNavigate();

  // Sets the string to be displayed for the spell level
  let spellLevelText;
  switch (spell.level) {
    case 0:
      spellLevelText = "Cantrip";
      break;
    case 1:
      spellLevelText = "1st-Level";
      break;
    case 2:
      spellLevelText = "2nd-Level";
      break;
    case 3:
      spellLevelText = "3rd-Level";
      break;
    case 4:
      spellLevelText = "4th-Level";
      break;
    case 5:
      spellLevelText = "5th-Level";
      break;
    case 6:
      spellLevelText = "6th-Level";
      break;
    case 7:
      spellLevelText = "7th-Level";
      break;
    case 8:
      spellLevelText = "8th-Level";
      break;
    case 9:
      spellLevelText = "9th-Level";
  }

  const classList = spell.classList.join(", ");
  const statBlock = spell.statBlock[0];

  const SpellTable = () => {
    const tableData = spell.table;

    return (
      <table className="my-4 statBlock">
        <thead>
          <tr>
            {tableData.map((item) => {
              return <th key={item}>{item.header}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {tableData[0].details.map((detail, index) => {
            return (
              <tr key={index}>
                {tableData.map((item, itemIndex) => {
                  return <td key={itemIndex}>{item.details[index]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const DescriptionDisplay = ({ spellDescription }) => {
    let descriptionArray = spellDescription
      .split("\n\n")
      .map((item) => item.trim());
    console.log(descriptionArray);

    return descriptionArray.map((item) => {
      if (item === "") return <SpellTable />;

      return <div className="py-2 text-start">{item}</div>;
    });
  };

  const AdditionalEffects = ({ effectsArray }) => {
    if (!effectsArray.length) return null;

    const renderEffectsArray = () => {
      return effectsArray.map((effect, index) => (
        <div className="spellCardField pb-3" key={index}>
          {effect}
        </div>
      ));
    };

    return (
      <div className="spellDescription pt-0 pb-4">{renderEffectsArray()}</div>
    );
  };

  const header = () => {
    return (
      <div className="spellCardHeader px-3">
        <h2 className="spellCardName">{spell.name}</h2>
        <div className="d-flex" style={{ alignItems: "center" }}>
          <h3 className="px-3"> {spell.isRitual ? "Ritual" : ""}</h3>

          <Button
            icon="pi pi-times"
            onClick={() => navigate(-1)}
            rounded
            outlined
          />
        </div>
      </div>
    );
  };

  const CardField = ({ title, content }) => {
    if (typeof content === "function") content = content();

    return (
      <div className="spellCardField">
        <div className="spellCardField">
          {title && <div className="fieldTitle">{title}</div>}
          {content && ` ${content}`}
        </div>
      </div>
    );
  };

  return (
    <Card className="spell-card" header={header}>
      <div>
        <CardField
          title={
            spell.level === 0
              ? `${spell.school} ${spellLevelText}`
              : `${spellLevelText} ${spell.school}`
          }
        />

        <CardField title="Casting Time: " content={spell.castingTime} />
        <CardField title="Range: " content={spell.range} />
        <CardField
          title="Components: "
          content={() => {
            let components = spell.components;
            if (spell.materialComponents.length) {
              components = `${components} (${spell.materialComponents})`;
            }
            return components;
          }}
        />
        <CardField
          title="Duration: "
          content={() => {
            let duration = spell.duration;
            if (spell.isConcentration) duration = `${duration} (Concentration)`;
            return duration;
          }}
        />
        <div className="spellDescription">
          <DescriptionDisplay spellDescription={spell.description} />
        </div>

        {spell.effectsArray && (
          <AdditionalEffects effectsArray={spell.effectsArray} />
        )}

        {spell.atHigherLevel && (
          <CardField title="At Higher Level: " content={spell.atHigherLevel} />
        )}

        <div className="pt-4 mt-4">
          <CardField title="Spell Lists: " content={classList} />
          <CardField title="Source: " content={spell.sourceBook} />
        </div>
        {statBlock && <StatBlock statBlock={statBlock} />}
      </div>
    </Card>
  );
}
