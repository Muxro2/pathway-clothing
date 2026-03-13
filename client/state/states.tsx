"use client"

import { useState } from "react";

export const useMenuState = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
}