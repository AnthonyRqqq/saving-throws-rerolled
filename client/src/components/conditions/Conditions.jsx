import { conditions } from "./conditions";
import { Accordion, AccordionTab } from "primereact/accordion";

import './Conditions.css'

export default function Conditions() {
  return (
    <div className="d-flex justify-content-center">
      <Accordion className="conditions-accordion" multiple>
        {Object.keys(conditions).map((con) => {
          const data = conditions[con];
          return (
            <AccordionTab header={con} key={con}>
              <div>
                {data.effects && (
                  <ul>
                    {data.effects.map((effect, idx) => {
                      return <li className="py-1" key={idx}>{effect}</li>;
                    })}
                  </ul>
                )}

                {data.table && (
                  <>
                    <div>{data.header}</div>
                    <table className="py-4 my-4">
                      <tbody>
                        {data.table.level.map((level, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="py-1">{level}</td>
                              <td className="py-1">{data.table.effect[idx]}</td>
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
