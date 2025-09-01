import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Trash2, 
  ImageIcon, 
  UploadCloud, 
  AlertCircle,
  CheckCircle2,
  ImagePlus
} from "lucide-react";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList, isLoading } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  const stats = [
    {
      title: "Total Banners",
      value: featureImageList?.length || 0,
      icon: ImageIcon,
      description: "Active banner images",
    },
    {
      title: "Upload Status",
      value: imageLoadingState ? "Uploading..." : "Ready",
      icon: UploadCloud,
      description: "Current upload status",
      status: imageLoadingState ? "loading" : "idle"
    },
    {
      title: "Latest Upload",
      value: uploadedImageUrl ? "Success" : "No recent uploads",
      icon: CheckCircle2,
      description: "Last upload status",
      status: uploadedImageUrl ? "success" : "idle"
    }
  ];

  async function handleUploadFeatureImage() {
    try {
      const result = await dispatch(addFeatureImage(uploadedImageUrl)).unwrap();
      if (result.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({
          title: "Success",
          description: "Banner uploaded successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || 'Failed to upload banner',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to upload banner',
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Banner Management</h1>
        <p className="text-gray-500">Upload and manage your banner images</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`
                rounded-full p-3
                ${stat.status === 'loading' ? 'bg-blue-100 text-blue-600' : ''}
                ${stat.status === 'success' ? 'bg-green-100 text-green-600' : ''}
                ${!stat.status ? 'bg-gray-100 text-gray-600' : ''}
              `}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <ImagePlus className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Upload New Banner</h2>
        </div>
        <Separator className="mb-6" />
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button 
          onClick={handleUploadFeatureImage} 
          className="mt-5 w-full"
          disabled={!uploadedImageUrl || isLoading}
        >
          <UploadCloud className="w-4 h-4 mr-2" />
          {isLoading ? 'Uploading...' : 'Upload Banner'}
        </Button>
      </Card>

      {/* Banners Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Current Banners</h2>
          <p className="text-sm text-gray-500">{featureImageList?.length || 0} banners</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative group">
                <Card className="overflow-hidden border border-gray-200">
                  <img
                    src={featureImgItem.image}
                    className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                    alt="Feature banner"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteFeatureImage(featureImgItem._id))
                        .then((result) => {
                          if (result.payload?.success) {
                            dispatch(getFeatureImages());
                            toast({
                              title: "Success",
                              description: "Banner deleted successfully"
                            });
                          } else {
                            toast({
                              title: "Error",
                              description: "Failed to delete banner",
                              variant: "destructive"
                            });
                          }
                        })
                        .catch((error) => {
                          toast({
                            title: "Error",
                            description: error.message || "Failed to delete banner",
                            variant: "destructive"
                          });
                        });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
              <AlertCircle className="w-10 h-10 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-1">No Banners Yet</h3>
              <p className="text-sm text-gray-500 mb-4">Upload your first banner to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
