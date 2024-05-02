import React, { useState, useEffect } from 'react';
import It_Beautiful_Now from './Korean/It_Beautiful_Now'; // Adjust the path as needed

function ParentComponent() {
    const [pageId, setPageId] = useState('yourPageId'); // Set the pageId state with the actual pageId value

    return (
        <div>
            {/* Pass the pageId prop to It_Beautiful_Now */}
            <It_Beautiful_Now pageId={pageId} />
        </div>
    );
}

export default ParentComponent;
