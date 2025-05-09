interface LoadingSpinnerProps {
    isOpen: boolean
    message?: string
  }
  
  const LoadingSpinner = ({ isOpen, message = "Cargando..." }: LoadingSpinnerProps) => {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center">
          <p className="text-lg font-medium mb-6">{message}</p>
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

export default LoadingSpinner;