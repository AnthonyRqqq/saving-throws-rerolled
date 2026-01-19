import { handleStatBonus } from "../../utils/lib";
import "./StatBlock.css";

const Action = ({ action }) => (
  <div className="spellCardField">
    <div>
      <div className="fieldTitle">{action.title}. </div>
      {action.type ? (
        <div>
          <div className="fst-italic">{action.type}: </div>
          <div>{action.hitBonus}, </div>
          <div>{action.range}, </div>
          <div>{action.target}, </div>
          <div>
            <div className="fst-italic">
              {action.description.substring(0, 4)}
            </div>
            <div>{action.description.substring(4)}</div>
          </div>
        </div>
      ) : (
        <div>{action.description}</div>
      )}
    </div>
  </div>
);

const CardField = ({ title, content }) => (
  <div className="spellCardField">
    <div>
      {title && <div className="fieldTitle">{title}</div>} {content && content}
    </div>
  </div>
);

export default function StatBlock({ statBlock }) {
  return (
    <div className="mt-4 pt-4 statBlock">
      <div className="d-flex">
        <div>
          <h2>{statBlock.name}</h2>
        </div>
      </div>
      <CardField content={`${statBlock.size} ${statBlock.type}`} />
      <div className="breakline"></div>
      <CardField title={"Armor Class: "} content={statBlock.armorClass} />
      <CardField title={"Speed: "} content={statBlock.speed} />
      <div className="breakline"></div>
      <div className="d-flex justify-content-space-between">
        <div className="text-center">
          <div className="fw-bold">STR</div> {statBlock.strength}{" "}
          {`(${handleStatBonus(statBlock.strength)})`}
        </div>

        <div className="text-center">
          <div className="fw-bold">DEX</div> {statBlock.dexterity}{" "}
          {`(${handleStatBonus(statBlock.dexterity)})`}
        </div>

        <div className="text-center">
          <div className="fw-bold">CON</div> {statBlock.constitution}{" "}
          {`(${handleStatBonus(statBlock.constitution)})`}
        </div>

        <div className="text-center">
          <div className="fw-bold">WIS</div> {statBlock.wisdom}{" "}
          {`(${handleStatBonus(statBlock.wisdom)})`}
        </div>

        <div className="text-center">
          <div className="fw-bold">INT</div> {statBlock.intelligence}{" "}
          {`(${handleStatBonus(statBlock.intelligence)})`}
        </div>

        <div className="text-center">
          <div className="fw-bold">CHA</div> {statBlock.charisma}{" "}
          {`(${handleStatBonus(statBlock.charisma)})`}
        </div>
      </div>
      <div className="breakline"></div>
      {statBlock.resistances.length > 0 && (
        <CardField
          title={"Damage Resistances: "}
          content={statBlock.resistances.join(", ")}
        />
      )}

      {statBlock.damageImmunities.length > 0 && (
        <CardField
          title={"Damage Immunities: "}
          content={statBlock.damageImmunities.join(", ")}
        />
      )}

      {statBlock.conditionImmunities.length > 0 && (
        <CardField
          title={"Condition Immunities: "}
          content={statBlock.conditionImmunities.join(", ")}
        />
      )}

      <CardField title={"Senses: "} content={statBlock.sense.join(", ")} />
      <CardField
        title={"Languages: "}
        content={statBlock.language.join(", ")}
      />
      <CardField title={"Challenge: "} content={statBlock.challenge || "-"} />
      <CardField
        title={"Proficiency Bonus: "}
        content={statBlock.proficiency}
      />
      <div className="breakline"></div>
      {statBlock.trait.map((trait) => {
        return (
          <CardField title={`${trait.title}.`} content={trait.description} />
        );
      })}
      <div className="mt-4 d-flex">
        <div>
          <h3>Actions</h3>
        </div>
      </div>
      <div className="breakline-sm"></div>
      {statBlock.action.map((action) => {
        return <Action action={action} />;
      })}
      {statBlock.bonusAction.length > 0 && (
        <>
          <div className="mt-4">
            <div>
              <h4>Bonus Actions</h4>
            </div>
          </div>

          <div className="breakline-sm"></div>

          {statBlock.bonusAction.map((action) => {
            return <Action action={action} />;
          })}
        </>
      )}
      {statBlock.reaction.length > 0 && (
        <>
          <div className="mt-4">
            <div>
              <h4>Reactions</h4>
            </div>
          </div>

          <div className="breakline-sm"></div>

          {statBlock.reaction.map((action) => {
            return <Action action={action} />;
          })}
        </>
      )}
    </div>
  );
}
