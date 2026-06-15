import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      size="small"
      onChange={(_event, value: string | null) => {
        if (value) {
          void i18n.changeLanguage(value);
        }
      }}
    >
      <ToggleButton value="ro">RO</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
}
