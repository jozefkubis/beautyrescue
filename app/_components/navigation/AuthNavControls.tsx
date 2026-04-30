"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getCurrentAdminStatus } from "@/app/_lib/actions_all/auth_actions";
import AdminLink from "../admin/AdminLink";
import LoginLink from "../admin/LoginLink";
import LogoutButton from "../admin/LogoutButton";
import Modal from "../Modal";

const LoginForm = dynamic(() => import("../admin/LoginForm"));

export default function AuthNavControls() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getCurrentAdminStatus().then((status) => {
      if (isMounted) {
        setIsAuthenticated(status.isAuthenticated);
        setIsAdmin(status.isAdmin);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isAdmin && <AdminLink />}

      {!isAuthenticated ? (
        <LoginLink setOpenModal={setOpenModal} />
      ) : (
        <LogoutButton />
      )}

      {!isAuthenticated && (
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          maxWidthClass="max-w-4xl"
        >
          {openModal && <LoginForm />}
        </Modal>
      )}
    </>
  );
}
