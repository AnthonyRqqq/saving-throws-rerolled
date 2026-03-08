import { GET_ALL_SPELL_LISTS } from "../../utils/queries";
import {
  CREATE_SPELL_LIST,
  UPDATE_SPELL_LIST,
  DELETE_SPELL_LIST,
} from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState, useId } from "react";
import Spinner from "../Spinner";
import NamePlate from "../Nameplate";

export default function SpellLists() {
  const [reload, setReload] = useState(0);

  const { userId } = useParams();
  const navigate = useNavigate();

  const [deleteList] = useMutation(DELETE_SPELL_LIST);

  const { loading, data, refetch } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId },
  });

  const handleDeleteSpellList = async ({ id }) => {
    await deleteList({ variables: { id } });
    refetch;
    setReload((prev) => prev + 1);
  };

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
            onDelete={async () => await handleDeleteSpellList({ id: list._id })}
            display={list.name}
          />
        );
      })}
    </div>
  );
}
