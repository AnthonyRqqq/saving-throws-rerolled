import { GET_ALL_SPELL_LISTS } from "../../utils/queries";
import {
  CREATE_SPELL_LIST,
  UPDATE_SPELL_LIST,
  DELETE_SPELL_LIST,
} from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { useEffect, useId } from "react";
import Spinner from "../Spinner";
import NamePlate from "../Nameplate";

export default function SpellLists() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId },
  });

  if (loading) return <Spinner />;

  if (!loading && !data) return "No data found.";

  return (
    <div className="d-flex justify-content-center flex-wrap">
      {data.spellLists.map((list) => {
        return (
          <NamePlate
            onClick={() => {
              navigate(`/spells/${list._id}`);
            }}
            display={list.name}
          />
        );
      })}
    </div>
  );
}
