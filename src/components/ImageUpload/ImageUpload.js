import React,{useState,useCallback} from "react"
import {Box,Flex,Text,Image,Input,Button, Spinner,useToast} from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import {IMAGE_UPLOAD} from "../../views/URLs/url"






const ImageUpload =()=>{
const toast=useToast()
    const [files,setFiles]=useState()
    const [filePath,setFilePath]=useState([])
    const [fileName,setFileName]=useState([])
    const [loading,setLoading]=useState(false)


    const onDrop = useCallback((acceptedFiles) => {
        console.log("myfiles......",acceptedFiles)
        acceptedFiles.map((file)=>(setFiles(file)))
      setFileName(acceptedFiles)
        
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
        

      const {getInputProps,getRootProps}= useDropzone({onDrop})

const uploadPics= async ()=>{
  if(fileName.length===0){
    toast({
      title:"Image Not Found",
      description:"Plese Select Images",
      status:"error"
    }
    )
  }
setLoading(true)
const ImageData=new FormData()
ImageData.append('image',files)

  await axios.post(IMAGE_UPLOAD,ImageData).then((responce)=>{
    console.log("my data......",responce.data.length)
    if(responce.data.length===1){
      toast({
        title:"Upload Sucess",
        description:"Image Upload Successfully",
        status:"success"
      })
    }
    setLoading(false)
  })
}



return(
    <>
    <Box pt={{ base: "170px", md: "90px", xl: "100px" }}>
      {fileName.map((item)=>(
        <Text>{item.name}</Text>
      ))}
        
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
      mt="70px"
      {...getRootProps({ className: "dropzone" })}
      >
      <Input variant='main' {...getInputProps()} />
      
    <Text>Drop your Image</Text>
    
      
      
      
    </Flex>
    
    <Flex justify="center" pt="20px" >
{loading ? <Spinner size="lg" color="#8b0000" />:

    <Button variant="solid" bg="#8b0000" textColor="#FFF" w="120px" h="40px" onClick={uploadPics} >Upload</Button>
  }
    </Flex>
    </Box>
    </>
)
}

export default ImageUpload