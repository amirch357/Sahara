import React,{useState,useCallback,useEffect} from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    InputGroup,
    FormControl,FormLabel,Textarea,Box,useColorModeValue,VStack,Flex,Text,Image,Spinner,useToast
  } from '@chakra-ui/react'
  import { useDropzone } from "react-dropzone"
import axios from "axios"
import {CREATE_APPEALS} from "../../../views/URLs/url"

  const CampaingModal =({isOpen,onOpen,onClose})=>{
    const [title,setTitle]=useState("")
    const [goal,setGoal]=useState("")
    const [desc,setDesc]=useState("")
    const [cat,setCat]=useState("")
    const [files,setFiles]=useState()
    const [disable,setDisable]=useState(false)
    const [filePath,setFilePath]=useState(null)
    const [loading,setLoding]=useState(false)
    const handleTitle=(event)=>setTitle(event.target.value)
    const handleGoal=(event)=>setGoal(event.target.value)
    const handleDesc=(event)=>setDesc(event.target.value)
    const handleCat=(event)=>setCat(event.target.value)
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

      const CreateAppeals= async ()=>{
        
        setLoding(true)
console.log("my new file",files)
const formData= new FormData();
formData.append('title',title)
formData.append('goal',goal)
formData.append('cate',cat)
formData.append('description',desc)
formData.append('image',files)


        fetch(CREATE_APPEALS, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              console.log('response', response);
              if(response.error){
                toast({
                  title:"Error",
                  status:"error",
                  description:"Some thing went wrong "
                })
                
              }else {
                toast({
                  title:"Appeal Created",
                  status:"success",
                  description:"Your Appeal is created",
                  isClosable:true
                })
                setDesc("")
                setGoal("")
                setTitle("")
              }
               
                setLoding(false)
              
              
             
            })
            .catch((error) => {
              console.log('error..........', error);
              setLoding(false)
            });
    }


useEffect(()=>{
  if(title.length===0   || filePath===null || cat.length===0 || goal.length===0){
    setDisable(true)
  
  }else{
    setDisable(false)
  }
})
    
        

const {getInputProps,getRootProps}= useDropzone({onDrop})

return(
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Appeals</ModalHeader>
         
         
         
          
  
          <ModalCloseButton />
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

                  <FormControl>
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
                  <FormControl>
                    <FormLabel>Category</FormLabel>

                    <InputGroup>
                     
                      <Input type="text" name="category" placeholder="Enter category" value={cat} onChange={handleCat} />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
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
     <Image src={filePath} boxSize="110px" objectFit="cover"  alt='appeals image' />  
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
                    disabled={disable}
                    onClick={CreateAppeals}
                    isFullWidth>
                    Save
                  </Button>
                  }
                </VStack>
              </Box>
          </ModalBody>

        
        </ModalContent>
      </Modal>
    
    </>
)


  }

  export default CampaingModal