import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import styles from "./ThemeChanger.module.scss";
import Sun from "../../public/icons/sun.svg";
import Moon from "../../public/icons/moon.svg";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [isOn, setIsOn] = useState<boolean>(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    setMounted(true);
    setIsOn(theme !== "dark");
  }, []);

  useEffect(() => {
    setTheme(isOn ? "light" : "dark");
  }, [isOn]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.switch} data-ison={isOn} onClick={toggleSwitch}>
      <div className={styles.switch_sun}>
        <Sun />
      </div>
      <motion.div className={styles.handle} layout transition={spring} />
      <div className={styles.switch_moon}>
        <Moon />
      </div>
    </div>
  );
};

export default ThemeChanger;
