
export const getStyleClass = (status: string) => {
        switch(status.toLowerCase()) {
            case 'all':
            return 'all-badge';
            case 'ongoing':
                return 'ongoing-badge';
            case 'completed':
                return 'completed-badge'
            case 'done':
                return 'completed-badge';
            case 'approved':
                return 'approved-badge';
            case 'draft':
                return 'draft-badge'
        }
    }
