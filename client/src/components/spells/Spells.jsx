// import { useEffect, useState, useRef } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import {
//   GET_ALL_SPELLS,
//   GET_ALL_SPELL_LISTS,
// } from "../../utils/queries";
// import { CREATE_SPELL_LIST } from "../../utils/mutations";
// // import { Spinner, Button } from "react-bootstrap";
// import SpellCard from "./SpellCard";
// import FilterSelect from "./FilterSelect";
// import Filters from "./Filters";
// import SpellListSidebar from "./SpellListSidebar";
// import InputModal from "../Modals/InputModal";
// import AccountModal from "../Modals/AccountModal";
import Auth from "../../utils/auth";
// import "./Spells.css";
import { sortByName } from "../../utils/lib";

import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_ALL_SPELLS } from "../../utils/queries";
import { useQuery } from "@apollo/client/react";

import Spinner from "../Spinner";
import SpellCard from "./SpellCard";

import "./Spells.css";

export default function Spells() {
  const [spells, setSpells] = useState([]);

  const [searchParams] = useSearchParams();
  const spellid = searchParams.get("spellid");
  const userid = searchParams.get("userid");
  const { listid } = useParams();
  const navigate = useNavigate();

  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  useEffect(() => {
    if (allSpellsLoading || !allSpellsData) return;
    let spells = allSpellsData.spells;
    const sortedSpells = sortByName([...spells]);
    setSpells(sortedSpells);
  }, [allSpellsData, allSpellsLoading]);

  if (allSpellsLoading) return <Spinner />;

  const getSpellCard = () => {
    if (!spells.length) return null;
    const selectedSpell = spells.find((s) => s._id === spellid);
    return <SpellCard spell={selectedSpell} />;
  };

  return (
    <div className="spell-list-div">
      {spellid && getSpellCard()}

      <ul className="spell-list">
        {spells.map((spell, idx) => (
          <li className="spell-name py-1 px-2 col-lg-3 col-sm-4 col-md-3">
            <span
              onClick={() =>
                navigate(`/spells?spellid=${spell._id}`, { replace: !!spellid })
              }
              className="nav-div"
            >
              {spell.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
