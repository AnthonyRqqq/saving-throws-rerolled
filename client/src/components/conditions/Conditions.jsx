import { conditions } from "./conditions";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function Conditions() {
  return (
    <div>
      <Accordion multiple>
        {Object.keys(conditions).map((con) => {
          const data = conditions[con];
          return (
            <AccordionTab header={con} key={con}>
              <div>
                {data.effects && (
                  <ul>
                    {data.effects.map((effect, idx) => {
                      return <li key={idx}>{effect}</li>;
                    })}
                  </ul>
                )}

                {data.table && (
                  <>
                    <div>{data.header}</div>
                    <table>
                      <tbody>
                        {data.table.level.map((level, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{level}</td>
                              <td>{data.table.effect[idx]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div>{data.footer}</div>
                  </>
                )}
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
    </div>
  );
}
