export  const addProduct = async ({name,description,price,category,Stock,warning,image,CreatedBy,success,setLoading,navigate,error,addProducts}) => {
    console.log(name);
    if (
      name?.trim() === "" ||
      description?.trim() === "" ||
      price === "" ||
      category === "" ||
      Stock === ""
    ) {
      warning("Fields can't be empty")
      return;
    } else if (image?.image.length < 3) {
      error();
    } else {
      setLoading(true);
      let Status = "Publish";
      const response = await addProducts(
        name,
        description,
        price,
        category,
        image?.image,
        CreatedBy,
        Stock,
        Status
      );
      if (response.status === 201) {
        success("Item Added Successfully");
        setLoading(false);
        setTimeout(()=>{
          navigate("/home");
        },300);
      }
    }
  };