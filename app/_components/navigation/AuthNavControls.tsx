"use client";

import { getCurrentAdminStatus } from "@/app/_lib/actions_all/auth_actions";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AdminLink from "../admin/AdminLink";
import LoginLink from "../admin/LoginLink";
import LogoutButton from "../admin/LogoutButton";
import Modal from "../Modal";

const LoginForm = dynamic(() => import("../admin/LoginForm"));

export default function AuthNavControls() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // 🔁 funkcia na refresh auth stavu (po login/logout)
  const refreshAuthStatus = async () => {
    const status = await getCurrentAdminStatus();
    setIsAuthenticated(status.isAuthenticated);
    setIsAdmin(status.isAdmin);
  };

  // 🔄 prvotné načítanie stavu
  useEffect(() => {
    let isMounted = true;

    async function loadAuthStatus() {
      const status = await getCurrentAdminStatus();

      if (!isMounted) return;

      setIsAuthenticated(status.isAuthenticated);
      setIsAdmin(status.isAdmin);
    }

    loadAuthStatus();

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
          {openModal && (
            <LoginForm
              onSuccess={async () => {
                await refreshAuthStatus();
                setOpenModal(false);
              }}
            />
          )}
        </Modal>
      )}
    </>
  );
}
