import React, { useCallback, useEffect, useState } from "react";

import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import classes from "./UsersPage.module.scss";
import UserCard from "../../components/user-card/UserCard";
import { BadgeModel } from "../../models/badges.model";
import { badgesService } from "../../services/badges.service";

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [badges, setBadges] = useState<BadgeModel[]>([]);

  const navigate = useNavigate();
  const [view ,setView] = useState<"card" | "table">("card");

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgesService.getBadges());
    };
    fetchBadges();
  }, []);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);

    fetchUsers();
  };

    const goToCardView=()=>{

      setView("card");
    };
    const goToTableView=()=>{

      setView("table");
    };

  return (
    <Page title="Users">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Button color="primary" className="w-100 mb-3" onClick={goToUserPage}>
            Create User
          </Button>
        </div>
      </div>
      <div>
      <Button onClick={goToCardView}>Card</Button>
      </div>
      <div>
        <Button onClick={goToTableView}>Table</Button>
      </div>
      {view === "card" ? (
      <div className="row">
        {users.map((user) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
            <UserCard
              user={user}
              handleDeleteUser={handleDeleteUser}
              badges={badges}
            />
          </div>
        ))}
      </div>
      ): (
        <table>
           <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Badges</th>
            </tr>
            </thead>
            <tbody>
            {users.map(({ id, name, image,badges }) => (
              
              <tr key={id}>
               <Link to={`/user/${id}`} >
                <td>{name}</td>
                </Link>
                <td>
                  <img src={image} alt={`user #${id}`} style={{ width: "50px", height: "50px" }} />
                </td>
                <td>
                  <Button color="danger" onClick={() => handleDeleteUser(id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </Button>
                </td>
               
                <td></td>
              </tr>
             
            ))}
            </tbody>
        </table>
      )}
    </Page>
  
  );
};

export default UsersPage;
