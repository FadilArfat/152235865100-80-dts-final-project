import { motion } from "framer-motion";
import classNames from "classnames";

const PageWrapper = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className={classNames("min-h-screenHeightWithoutHeader", className)}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
