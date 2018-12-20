db.sales.aggregate([ 
    {
    $group: {
        _id: {
          year: {
            $year: '$month'
          },
          month: {
            $month: '$month'
          }
        },
      }
    },
  ]);