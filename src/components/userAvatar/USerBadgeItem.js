import { Badge } from "@chakra-ui/layout";
import {AiTwotoneDelete} from "react-icons/ai"


const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
    
    <Badge
      px={2}
      py={1}
            borderRadius="lg"
            display={"flex"}
            justifyContent={'space-around'}
            alignItems={"center"}
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="green"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
            {admin === user._id && <span> (Admin)</span>}
            {<AiTwotoneDelete/>}
        </Badge>
        
  );
};

export default UserBadgeItem;