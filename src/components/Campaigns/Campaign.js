import React,{useState,useEffect,useCallback} from "react"
import { Box,Table,Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Td,Button, 
    Stack, 
    useDisclosure,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,Image,Text,Spinner,VStack,FormControl,FormLabel,Textarea,Flex,Input,useToast,useColorModeValue,InputGroup,Card,CardBody,ModalCloseButton } from "@chakra-ui/react"
import {EditIcon,DeleteIcon} from "@chakra-ui/icons"
import axios from "axios"
import CampaingModal from "./CampaignModal/CampaignModal"
import { useDropzone } from "react-dropzone"
import {APPEALS_URL,DELETE_URL} from "../../views/URLs/url"
const Campaign=()=>{
    const [data,setData]=useState([])
    const {isOpen,onOpen,onClose}=useDisclosure()
    const[title,setTitle]=useState("")
    const [createModal,setCreateModal]=useState(false)
    const [updateModal,setUpdateModal]=useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [goal,setGoal]=useState("")
    const [desc,setDesc]=useState("")
    const [id,setId]=useState("")
    const [files,setFiles]=useState()
    const [filePath,setFilePath]=useState(null)
    const [loading,setLoding]=useState(false)
    const [tableLoading,setTableLoading]=useState(true)
    const handleTitle=(event)=>setTitle(event.target.value)
    const handleGoal=(event)=>setGoal(event.target.value)
    const handleDesc=(event)=>setDesc(event.target.value)
   const toast=useToast()
    

   const onDrop = useCallback((acceptedFiles) => {
    console.log("myfiles......",acceptedFiles)
    acceptedFiles.map((file)=>setFiles(file))
    
    
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        setFilePath(binaryStr)
      }
      reader.readAsDataURL(file)
    })
    
  }, [])



const getData= async ()=>{
    await axios.get(APPEALS_URL)
    .then((responce)=>{
        console.log(responce.data.data)
        setData(responce.data.data)
        setTableLoading(false)
    })
}

const updateAppeals=async () =>{
  setLoding(true)
    const UpdateForm = new FormData()
    UpdateForm.append('id',id)
    UpdateForm.append('title',title)
    UpdateForm.append('description',desc)
    UpdateForm.append('goal',goal)
    UpdateForm.append('image',files)
await axios.put(`https://sflt.herokuapp.com/api/appeals/${id}`,UpdateForm).then((responce)=>{
    console.log(responce.status)
    setLoding(false)
})
}

const deleteAppels= async ()=>{
  setLoding(true)
await axios.delete(`${DELETE_URL}/${id}`).then((responce)=>{
  console.log(responce.status)
  if(responce.status===204){
    toast({
      title:"Appeals Delete",
      description:"Your Appeal is Deleted",
      status:"success"
    })
    setDeleteModal(false)
  }
  setLoding(false)
})
}

function EditModal(title,goal,description,image,id){
console.log(title)
setTitle(title)
setGoal(goal)
setDesc(description)
setId(id)
setFilePath(`https://sflt.herokuapp.com/image/${image}`)
setUpdateModal(true)
}

function DeleteModal(title,id){
setTitle(title)
setId(id)
setDeleteModal(true)
}
const {getInputProps,getRootProps}= useDropzone({onDrop})
useEffect(()=>{
    getData()
},[])

console.log("myfile..................",filePath)

    return(
        <>
        <CampaingModal isOpen={createModal} onClose={()=>setCreateModal(false)} />
        <Modal isOpen={updateModal} onClose={()=>setUpdateModal(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Update Appeals
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                <Box
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={8}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base">
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                        
                    <InputGroup>
                     
                      <Input type="text" name="title" placeholder="Enter Title" value={title} onChange={handleTitle} />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Goal</FormLabel>

                    <InputGroup>
                      
                      <Input
                        type="number"
                        name="goal"
                        placeholder="Enter Goal"
                        value={goal}
                        onChange={handleGoal}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>

                    <Textarea
                      name="description"
                      placeholder="Enter Description"
                      rows={6}
                      resize="none"
                      value={desc}
                      onChange={handleDesc}
                    />
                  </FormControl>
                  <Flex
      align='center'
      justify='center'
     
      border='1px dashed'
     bg="#FFF"
      borderRadius='16px'
      w='100%'
      h='120px'
      minH='100%'
      cursor='pointer'
      {...getRootProps({ className: "dropzone" })}
      >
      <Input variant='main' {...getInputProps()} />
      {filePath !==null ?
     <Image src={filePath} boxSize="110px" objectFit="cover"  alt='appeals image' crossOrigin="anonymous" />  
    :
    <Text>Drop your Image</Text>
    }
      
      
      
    </Flex>

               {loading?<Spinner size="lg"  />:
               
                  <Button
                    colorScheme="blue"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={updateAppeals}
                    isFullWidth>
                    Update
                  </Button>
                  }
                </VStack>
              </Box>
                </ModalBody>
                </ModalContent>
        </Modal>
        <Modal isOpen={deleteModal} onClose={()=>setDeleteModal(false)}  >
          <ModalContent>
            <ModalHeader>
              Delete Appeals
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Box  bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={8}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base">
                  <VStack spacing={5} >
              <Text>Are you sure you want delete {title}</Text>
              <Flex w="full" justify="center">
                {loading?<Spinner size="lg" color="#8b0000" />:
              <Button
                    colorScheme="blue"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={deleteAppels}
                    isFullWidth>
                    Delete
                  </Button>
}
                  </Flex>
                  </VStack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box  pt={{ base: "170px", md: "90px", xl: "100px" }}>
            <Stack justify="center" align="flex-end" pb="10px">
            <Button variant="solid" bg="#8b0000" w="120px" textColor="#FFF" h="50px" onClick={()=>setCreateModal(true)}>Create New</Button>
            </Stack>
            {tableLoading?<Flex justify="center" align="center" > <Spinner size="lg" color="#8b0000" /></Flex>:
            <TableContainer bg="Background" >
                  <Box overflowY="auto" maxHeight="470px" >
           
        <Table >
        <Thead bg="#8b0000" textAlign="center" >
            <Tr>
            <Th color="#FFF" >ID</Th>
            <Th color="#FFF" >Title</Th>
            <Th color="#FFF">Description</Th>
            <Th color="#FFF">Created on</Th>
            <Th color="#FFF">Updated By</Th>
            <Th color="#FFF">Goal</Th>
            <Th color="#FFF">Edit</Th>
            <Th color="#FFF">Delete</Th>

            </Tr>
        
        </Thead>
        {data.map((item)=>(
          
            <Tbody>
           
           
                <Tr>
                    <Td>{item.ID}</Td>
                    <Td position="sticky" bg="#FFF" left={0} top={0} >{item.TITLE}</Td>
                    <Td  >{item.DESCRIPTION}</Td>
                    <Td>{item.CREATED_ON}</Td>
                    <Td>{item.UPDATED_BY}</Td>
                    <Td>{item.GOAL}</Td>
                    <Td>
                        <IconButton  icon={ <EditIcon w="20px" h="20px" color="#8b0000" />} onClick={()=>EditModal(item?.TITLE,item?.GOAL,item?.DESCRIPTION,item?.IMAGE,item?.ID)} />
                       
                    </Td>
                    <Td>
                        <IconButton  icon={ <DeleteIcon w="20px" h="20px" color="red" />} onClick={()=>DeleteModal(item?.TITLE,item?.ID)} />
                       
                    </Td>
                </Tr>
            
           
        
    </Tbody>
        ))}
        
        </Table>
      
        </Box>
        </TableContainer>
        }
        </Box>
        </>
    )
   
}

export default Campaign